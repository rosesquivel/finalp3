import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import { Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';



class Profile extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            listaPost: []
        }
    }
    componentDidMount() {
        console.log("En profile")
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: users
                    })
                })
            }
        )
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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

    deleteAccount(userId) {

        console.log("En deleteAccount")
        db.collection('users').doc(userId).delete()
            .then(() => {
                console.log("usuario eliminado")
                auth.currentUser.delete()
                auth.signOut()
                this.props.navigation.navigate('Register')
            })
            .catch((error) => {
                console.error(error);
            });
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        console.log(auth.currentUser.email);
        return (
            <ScrollView>
                <Text style={styles.screenTitle}>My Profile</Text>

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

                    </View>
                    }
                    style={styles.datosPerfil}
                />
                <View style={styles.botonesContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                        <Text style={styles.textButton}>Log out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('EditProfile', { userData: this.state.users, navigation: this.props.navigation.navigate })}>
                        <Text style={styles.textButton}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.botonesContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.deleteAccount()}>
                        <Text style={styles.textButton}>Delete account</Text>
                    </TouchableOpacity>
                </View>


                <Text style={styles.screenTitle}>My Posts</Text>

                {
                    this.state.listaPost.length === 0
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
                            renderItem={({ item }) => <Post infoPost={item} navigate={this.props.navigation.navigate} />}
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
        alignSelf: 'flex-end',
        height: 30,
        width: 150,
        backgroundColor: '#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 'auto',  // Centra verticalmente
        marginLeft: 10,
    },
    botonesContainer: {
        flexDirection: 'row',  // Cambia a 'row' para alinear horizontalmente
        justifyContent: 'center'
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    }

})

export default Profile;