import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length,
            textoComment: ''
        }
    }

    componentDidMount(){
        console.log('En post')
        //Indicar si el post ya está likeado o no.
        if(this.props.infoPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }



   likear(){
    //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.

    //update en base de datos
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: true,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))


   }

   unLike(){
    //Quitar del array de likes al usario que está mirando el post.
    db.collection('posts').doc(this.props.infoPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }
   
   guardarComment(){
    db.collection('posts').doc(this.props.infoPost.id).update({
        comments: firebase.firestore.FieldValue.arrayUnion({text: this.state.textoComment, userEmail: auth.currentUser.email})
    })
    .then( res => {
        this.setState({
            textoComment: ''
        })
    })
    .catch( e => console.log(e))
   }



   
    render(){
        console.log(this.props);
        return(
            <View style={styles.unPostContainer}>
                 <TouchableOpacity onPress={()=>this.props.navigate('OtherProfile',  {userData: this.props.infoPost.datos.owner})}>
                 <Text>{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Image
                    style={styles.image}
                    source = {this.props.infoPost.datos.fotoUrl}
                    resizeMode= "center"
                />
                <Text>{this.props.infoPost.datos.textoPost}</Text>
                <Text>Likes: {this.state.cantidadDeLikes}</Text>
                <TouchableOpacity onPress={()=>this.props.navigate('Comments')}>
                    <Text>{(this.props.infoPost.datos.comments ? this.props.infoPost.datos.comments.length : <Text>No</Text>)} comments</Text>
                </TouchableOpacity>
                {/* If ternario */}
                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unLike()}>
                    <AntDesign name="heart" size={24} color="red" />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.likear()}>
                    <AntDesign name="hearto" size={24} color="black" />
                </TouchableOpacity>
                }
                {this.props.infoPost.datos.comments && this.props.infoPost.datos.comments.length  > 0 ?
                 <FlatList 
                        data= {this.props.infoPost.datos.comments}
                        keyExtractor={ key => key.text+key.user }
                        renderItem={ (comment) =><Text>{comment.item.text}</Text> }
                    /> : null}
                
                <View style={styles.commentSection}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoComment: text})}
                    placeholder='Comment...'
                    keyboardType='default'
                    value={this.state.textoComment}
                />
                {this.state.textoComment === "" ? null : <TouchableOpacity style={styles.button} onPress={ () => this.guardarComment()}>
                   <Text style={styles.textButton} >Add</Text>
                </TouchableOpacity>}
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    unPostContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },
    lista:{},
    commentSection:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginVertical: 10
    },
    image: {
        height: 80,
        width: "100%",
    
    },
    input:{
        height:25,
        width: '80%',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,

    },
    button:{
        height:25,
        width: "15%",
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
})


export default Post;