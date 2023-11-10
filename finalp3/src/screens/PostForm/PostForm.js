import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
        }
    }

    
    crearPost(owner, textoPost, createdAt, img="", ){
        //Create Post Collection
        db.collection('posts').add({
            owner: owner, 
            textoPost: textoPost, 
            createdAt: createdAt,
            likes: [],
            fotoUrl: img
        })
        .then( res => 
        console.log(res),
        this.props.navigation.navigate('Home')
        )
          
        .catch( e => console.log(e))
    } 

   
    

    render(){
        return(      
    <View style={styles.right}>
            <View style={styles.firstBox}>
                <Text>New Post</Text>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.textButton}>Take Photo</Text>    
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Write a caption...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now(), null)}>
                    <Text style={styles.textButton}>Post</Text>    
                </TouchableOpacity>
            </View>
    
    </View>
    


        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },

    right:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    firstBox:{
        borderRadius: 6,
        padding: 70,
        marginVertical: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderColor:'#EEEEEE'
    },
    //CONFIGURACIONES GENERALES
    input:{
        height:37.6,
        width: 268.4,
        paddingVertical: 15,
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

})


export default PostForm;