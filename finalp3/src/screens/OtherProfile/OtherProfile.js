import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import { Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import firebase from 'firebase';

class OtherProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            listaPost: [],
            cargandoPosts: true
        }
    }
    componentDidMount() {
        console.log("En OtherProfile")
        db.collection('users').where('owner', '==', this.props.route.params.userData).onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
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

                posteos.forEach(unPost => {
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


    render() {
        console.log(this.state);

        return (
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.screenTitle}>{this.props.route.params.userData}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.textButton}>Back</Text>{/* ver si existe styles Text button, lo saque de profile */}
                    </TouchableOpacity>
                </View>


                <FlatList
                    data={this.state.users}
                    keyExtractor={user => user.id}
                    renderItem={({ item }) => <View style={styles.datosPerfil}>
                        <Image
                            style={styles.imagenPerfil}
                            source={item.data.profilePicture}
                            resizeMode="contain"
                        />

                        <Text style={styles.datosPerfilText}>Username:</Text>
                        <Text style={styles.datosPerfilValue}>{item.data.username}</Text>
                        <br></br>

                        <Text style={styles.datosPerfilText}>Descripción:</Text>
                        <Text style={styles.datosPerfilValue}>{item.data.bio}</Text>

                    </View>}
                    style={styles.datosPerfil}
                />

                <Text style={styles.screenTitle}>Posts</Text>

                {this.state.listaPost.length === 0
                    ?
                    <Image
                        style={styles.image}
                        source={require('/assets/spinning-loading.gif')}
                        resizeMode="center"
                    />
                    :
                    <FlatList
                        data={this.state.listaPost}
                        keyExtractor={unPost => unPost.id}
                        renderItem={({ item }) => <Post infoPost={item} />}
                        style={styles.listaPosts}
                    />
                }
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    screenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    imagenPerfil: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },

    datosPerfil: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 20,
        marginVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    datosPerfilText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    datosPerfilValue: {
        fontSize: 14,
        color: '#555',
    },

    mainContainer: {
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
    button: {
        alignSelf: 'flex-start',
        height: 30,
        width: 90,
        backgroundColor: '#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    }
})

export default OtherProfile;