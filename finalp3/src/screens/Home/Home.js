import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';


class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost: [],
            searchText: ''
        }
    }

    componentDidMount(){
        //Traer datos
        db.collection('posts').
        orderBy('createdAt', 'desc')
        .onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })

                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )
    }




    render(){
        console.log("En menu");
        return(
            <ScrollView> 
                <Text style={styles.screenTitle}>Posts</Text>
                {
                    this.state.listaPost.length === 0 
                    ?
                    <Image
                        style={styles.image}
                        source = {require('/assets/spinning-loading.gif')}
                        resizeMode= "center"
                    />
                    :
                   
                    <FlatList 
                        data= {this.state.listaPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <Post infoPost = { item } navigate={this.props.navigation.navigate}/> }
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
    button:{
        height:25,
        width: "20%",
        backgroundColor:'#46627f',
        marginLeft: "5%",
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#46627f',
    },
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    image: {
        alignSelf: 'center',
        height: 80,
        width: "20%",
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 100
    },
    listaPosts: {
        
    }
    

})

export default Home;