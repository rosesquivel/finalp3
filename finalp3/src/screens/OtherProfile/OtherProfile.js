import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import firebase from 'firebase';

class OtherProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            users: [],
            listaPost: [],
            cargandoPosts: true
        }   
    }
    componentDidMount(){
        console.log("En OtherProfile")
        db.collection('users').where('owner', '==', this.props.route.params.userData).onSnapshot(
            docs =>{
                let users = [];
                docs.forEach( doc => {
                    users.push({
                       id: doc.id,
                       data: doc.data()
                    })
                    if (doc.data().owner == auth.currentUser.email) {
                        console.log("Se busco a si mismo, redirigimos a miperfil");
                        this.props.navigation.navigate('Profile') 
                    }
                this.setState({
                    users: users
                })
                })
            }
        )
        db.collection('posts').where('owner', '==', this.props.route.params.userData).onSnapshot(
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
        console.log(this.state);
        
        return(
            <ScrollView>
                <View style={styles.header}>
                <Text style={styles.screenTitle}>{this.props.route.params.userData}</Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Home')}>
                    <Text style={styles.textButton}>Back</Text>{/* ver si existe styles Text button, lo saque de profile */}
                </TouchableOpacity>
                </View>
                
           
                <FlatList 
                        data= {this.state.users}
                        keyExtractor={ user => user.id }
                        renderItem={ ({item}) => <View>
                        <Text>Username: {item.data.username}</Text>
                        <Text>Bio: {item.data.bio}</Text>
                        <Image
                                style={styles.image}
                                source={item.data.profilePicture}
                                resizeMode="contain"/>
                        </View> }
                        style={styles.datosPerfil}
                    />  
                
                <Text style={styles.screenTitle}>Posts</Text>
                
                {this.state.listaPost.length === 0 
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
                        style= {styles.listaPosts}
                    />
                }                
            </ScrollView>
            
        )}
        }

const styles = StyleSheet.create({
       //CONTENEDOR GENERAL
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    image: {
        height: 200
    },
   
    datosPerfil:{
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5,
    },
    mainContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5,
        height: 100
    },
    image: {
        width: 300, 
        height: 150,
    },
    button:{
        alignSelf: 'flex-start',
        height:30,
        width: 90,
        backgroundColor:'#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    }
})

export default OtherProfile;