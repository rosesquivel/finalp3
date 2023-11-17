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

  /*   searchUsers(searchText){
      this.state.todosUsers.forEach( unUser => {
        if (searchText.length==0){
            this.setState({
                usersFiltrados: []
            })
        }
        // Para no duplicar usuarios en los resultados:
        if (unUser.datos.owner.includes(searchText) ) {
            if(this.state.usersFiltrados.includes(unUser))
            {null}
            else{this.state.usersFiltrados.push(unUser)}
        }
      })
    } */

    searchUsers(searchText){
        let nuevaLista = []
        for (let i = 0; i < this.state.todosUsers.length; i++) {
            if (this.state.todosUsers[i].datos.owner.includes(searchText) ) {
                // IF Para no duplicar usuarios en resultados:
                if(this.state.usersFiltrados.includes(this.state.todosUsers[i]))
                {null}
                else{nuevaLista.push(this.state.todosUsers[i])}
            }
            if (searchText.length==0){
                nuevaLista = []
            }
        }
        this.setState({
            usersFiltrados: nuevaLista
        })
      }



    render(){

        console.log(this.state.todosUsers);
        console.log(this.state.usersFiltrados);
        console.log(this.state.searchText);
        return(
            <ScrollView>
                
                <Text style={styles.screenTitle}>Search Results</Text>
                <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=> (this.searchUsers(text), this.setState({searchText: text.toLowerCase()}))}
                    placeholder='Search email'
                    keyboardType='default'
                    value={this.state.searchText}>
                </TextInput>
                </View>

                {
                    this.state.usersFiltrados.length === 0 
                    ?
                    <Text style={styles.noResults}>No results</Text>
                    :
                   
                    <FlatList 
                        data= {this.state.usersFiltrados}
                        keyExtractor={ unUser => unUser.id }
                        renderItem={ ({item}) => <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { userData: item.datos.owner, navigation: this.props.navigation })}>
                        <Text style={styles.unPostContainer}>{item.datos.owner}</Text>
                    </TouchableOpacity> }
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
        marginBottom: 25,
    },
    input:{
        height:25,
        width: '80%',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        
    },
    unPostContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5,
        fontWeight: 'bold'
    },
    noResults: {
        marginHorizontal: 20,
        fontSize: 15,
        backgroundColor: '#F00',
        borderRadius: 6,
        color: '#800',
        width: 200,
        alignSelf: 'center',
        textAlign: 'center'
    },

})

export default SearchResults;