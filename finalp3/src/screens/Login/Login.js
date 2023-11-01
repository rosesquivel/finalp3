import React, { Component } from 'react';
import {auth } from '../../firebase/config';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:''
        }
    }

    login (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                console.log('Login ok', response);
                this.props.navigation.navigate('Menu')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                console.log(error);
            })
    }

    render(){
        return(
            <View style={styles.mainContainer}>        
            <View style={styles.right}>
            <View style={styles.firstBox}>
            <Image
                    style={styles.image}
                    source = {require('/assets/logoAura.png')}
                    resizeMode= "center"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='user@gmail.com'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Login</Text>    
                </TouchableOpacity>
                </View>

                <View style={styles.secondBox}>
                 <Text>I don't have an account</Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')}>
                   <Text style={styles.loginText}>Register</Text>
                </TouchableOpacity>
                </View>
           
            
            </View>
    
    <Text style= {styles.footerText}>Esquivel - García Devesa - Manoukian</Text>
    </View>
        )
    }
}

const styles = StyleSheet.create({
     //CONTENEDOR GENERAL
     mainContainer:{
        flex: 1,
        backgroundColor: '#ffffff'
    },

    //PANTALLA CON FORM
    right:{
        flex: 1,
        justifyContent: 'center',
    },

    firstBox:{
        borderRadius: 6,
        padding: 70,
        marginVertical: 20,
        marginHorizontal: 600,
        borderWidth: 1,
        borderColor: 'black', 
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondBox:{
        borderRadius: 6,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 600,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center', 
    },

    loginText:{
        color:'#46627f',
        fontWeight: 'bold   '
    },

    image: {
        height: 80,
        width: "100%"
    },

    //FOOTER

    footerText: {
        textAlign: 'center',
        fontSize: 13,
        color: '#222f3d'
    },

    //CONFIGURACIONES GENERALES

    input:{
        height:37.6,
        width: 268.4,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,

    },
    button:{
        height:37.6,
        width: 268.4,
        backgroundColor:'#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        marginTop: 20
    },
    textButton:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },

    
    
    
    
    /* formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    } */

})


export default Login;