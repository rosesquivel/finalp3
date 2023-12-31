import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { Image, TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            isChecked: false,
            empty: false,
            length: false,
            format: false,
            used: false,
            email: '',
            username: '',
            password: '',
            bio: '',
            profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
            errorMessage: ''
        }
    }
    componentDidMount() {
        console.log("En register")
        //Si está logueado 
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('Login')
            }

        })
    }

    isError(email, password, username) {
        if (email == '' || username == '' || password == '') {
            this.setState({ empty: true });
            this.setState({ username: '' })
            this.setState({ email: '' })
            this.setState({ password: '' })

        }
        this.setState({ empty: false, errorMessage: '' })
        //Si pasa todas las verificaciones
        this.register(email, password, username)
    }



    register(email, pass, username, Bio, profilePic) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then(response => {
                console.log('Registrado ok', response);

                //Create user collection
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    username: this.state.username,
                    bio: this.state.bio,
                    profilePicture: this.state.profilePicture,
                    createdAt: Date.now(),
                })

            })
            .catch(error => {
                this.setState({
                    errorMessage: error.message
                })
                console.log(error);

            })
    }

    /*     //Remember me
        checkBox = () => {
            this.setState((prevState) => ({
                isChecked: !prevState.isChecked,
            }));
        }; */

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.right}>
                    <View style={styles.firstBox}>
                        <Image
                            style={styles.image}
                            source={require('/assets/logoAura.png')}
                            resizeMode="center"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                            blurOnSubmit={true}
                            placeholder='Email'
                            keyboardType='email-address'
                            value={this.state.email}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ username: text }) }}
                            blurOnSubmit={true}
                            placeholder='Username'
                            keyboardType='default'
                            value={this.state.username}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => { this.setState({ password: text }) }}
                            minLength={6}
                            blurOnSubmit={true}
                            placeholder='Password'
                            keyboardType='default'
                            secureTextEntry={true}
                            value={this.state.password}
                        />

                        {/* MENSAJES DE ERROR */}
                        {this.state.empty && (
                            <Text style={styles.errorBox}>Please fill out all the fields</Text>
                        )}

                        {(this.state.errorMessage === '' ? null : <Text style={styles.errorBox}>{this.state.errorMessage}</Text>)}

                        <TouchableOpacity style={styles.button} onPress={() => this.isError(this.state.email, this.state.password, this.state.username)}>
                            <Text style={styles.textButton}>Register</Text>
                        </TouchableOpacity>


                        {/*   
                { this.state.isChecked ?(
                <TouchableOpacity onPress={this.checkBox} style={styles.checkboxContainer}>
                <AntDesign
                    name='checksquare'
                    size={24}
                    color= 'black'
                />
                <Text style={styles.checkboxLabel}>Remembered!</Text>
                </TouchableOpacity>)
                : 
               ( <TouchableOpacity onPress={this.checkBox} style={styles.checkboxContainer}>
                <FontAwesome5 name="square" size={24} color="black" />
                <Text style={styles.checkboxLabel}>Remember me!</Text>
                </TouchableOpacity>)}
             */}
                    </View>




                    <View style={styles.secondBox}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={styles.footerText}>Esquivel - García Devesa - Manoukian</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    //PANTALLA CON FORM

    right: {
        flex: 1,
        justifyContent: 'center',
    },
    errorBox: {
        backgroundColor: '#ffc4c4',
        borderRadius: 6,
        marginTop: 5,
        color: 'red',
        width: '100%',
        textAlign: 'center'
    },
    firstBox: {
        backgroundColor: '#EEEEEE',
        borderRadius: 6,
        padding: 70,
        marginVertical: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondBox: {
        borderRadius: 6,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#EEEEEE',
        borderColor: '#EEEEEE',
        alignItems: 'center',
    },

    loginText: {
        color: '#46627f',
        fontWeight: 'bold   '
    },

    image: {
        height: 80,
        width: "100%",

    },

    //checkbox
    /*     checkboxContainer: {
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
        },
        checkboxLabel: {
            marginLeft: 8,
            fontSize: 13,
        }, */

    //FOOTER

    footerText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#222f3d'
    },

    //CONFIGURACIONES GENERALES
    input: {
        height: 37.6,
        width: 268.4,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },

    button: {
        height: 37.6,
        width: 268.4,
        backgroundColor: '#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        marginTop: 20
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },

})


export default Register;