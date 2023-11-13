import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';


class SearchResults extends Component {
    constructor(props){
        super(props)
        this.state={
            todosUsers: [],
            usersFiltrados: [],
            searchText: ''
        }
    }

    componentDidMount(){
        //Traer datos
        db.collection('users').onSnapshot(
            usuarios => {
                let usersDeDb = [];

                usuarios.forEach( unUser => {
                    usersDeDb.push(
                        {
                            id: unUser.id,
                            datos: unUser.data()
                        }
                    )
                })

                this.setState({
                    todosUsers: usersDeDb
                })
            }
        )
    }

    searchUsers(searchText){
      this.state.todosUsers.forEach( unUser => {
        if (searchText.length==0){
            this.setState({
                usersFiltrados: []
            })
        }
        if (unUser.datos.owner.includes(searchText) ) {
            if(this.state.usersFiltrados.includes(unUser))
            {null}
            else{this.state.usersFiltrados.push(unUser)}
        }
      })
    }



    render(){

        console.log(this.state.todosUsers);
        console.log(this.state.usersFiltrados);
        return(
            <ScrollView>
                
                <Text style={styles.screenTitle}>Search Results</Text>
                <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=> (this.searchUsers(text), this.setState({searchText: text}))}
                    placeholder='Search user'
                    keyboardType='default'
                    value={this.state.searchText}>
                </TextInput>
                </View>

                {
                    this.state.usersFiltrados.length === 0 
                    ?
                    <Text> Esperando busqueda</Text>
                    :
                   
                    <FlatList 
                        data= {this.state.usersFiltrados}
                        keyExtractor={ unUser => unUser.id }
                        renderItem={ ({item}) => <Text>{item.datos.owner}</Text> }
                        style= {styles.listaPosts}
                    />
                    
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    screenTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    searchContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 25
    },
    input:{
        height:25,
        width: '65%',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        
    },

})

export default SearchResults;