import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';


class Home extends Component {
    constructor(){
        super()
        this.state={
            listaPost: []
        }
    }

    componentDidMount(){
        //Traer datos
        db.collection('posts').onSnapshot(
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
            <View>
                
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
                        renderItem={ ({item}) => <Post infoPost = { item } /> }
                    />
                }
                
            </View>
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
    image: {
        alignSelf: 'center',
        height: 80,
        width: "20%",
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 100
    }
    

})

export default Home;