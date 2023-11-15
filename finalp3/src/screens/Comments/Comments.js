import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import React from 'react';

class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
            textoComment: '',
            comentariosExistentes: []
        }
    }

    componentDidMount(){
        this.setState({
            comentariosExistentes: this.props.route.params.infoPost.datos.comments
        })
    }

    guardarComment() {
        db.collection('posts').doc(this.props.route.params.infoPost.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({ text: this.state.textoComment, userEmail: auth.currentUser.email })
        })
            .then(res => {
                //this.comentariosExistentes.push(text)
                this.setState({
                    textoComment: '',
                })
                this.props.navigation.navigate('Home')
            })
            .catch(e => console.log(e))
    }

    render(){
        console.log(this.props.route.params.infoPost);
        console.log(this.state.comentariosExistentes);
        return(
            <ScrollView>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Home')}>
                    <Text style={styles.textButton}>Back</Text>{/* ver si existe styles Text button, lo saque de profile */}
                </TouchableOpacity>
                <Text style={styles.postOwner}>{this.props.route.params.infoPost.datos.owner}'s post:</Text>
                <Text style={styles.postText}>{this.props.route.params.infoPost.datos.textoPost}</Text>
                <Text style={styles.screenTitle}>Comments</Text>
                {(this.props.route.params.infoPost.datos.comments && this.props.route.params.infoPost.datos.comments.length > 0 ? null : <Text style={styles.noComments}>Be the first to comment!</Text>)}
                {this.props.route.params.infoPost.datos.comments && this.props.route.params.infoPost.datos.comments.length > 0 ?
                    <FlatList
                        data={this.props.route.params.infoPost.datos.comments}
                        keyExtractor={key => key.text + key.user}
                        renderItem={(comment) => <View  style={styles.unPostContainer}><TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { userData: comment.item.userEmail, navigation: this.props.navigation })}>
                        <Text style={styles.commenterEmail}>{comment.item.userEmail}:</Text>
                    </TouchableOpacity>
                    <Text>{comment.item.text}</Text></View>}
                    /> : null}
                <View style={styles.commentSection}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.setState({ textoComment: text })}
                        placeholder='Comment...'
                        keyboardType='default'
                        value={this.state.textoComment}
                    />
                    {this.state.textoComment === "" ? null : <TouchableOpacity style={styles.button} onPress={() => this.guardarComment()}>
                        <Text style={styles.textButton} >Add</Text>
                    </TouchableOpacity>}
                </View>
                
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
    postOwner:{ 
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10
    },
    postText:{
        fontSize: 15,
        marginLeft: 20,
    },
    unPostContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },
    noComments: {
        marginHorizontal: 20,
        fontSize: 15,
    },
    commentSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginVertical: 10,
        marginHorizontal: 20,
    },
    image: {
        height: 220,
        width: "100%",

    },
    input: {
        height: 25,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,

    },
    button: {
        height: 25,
        width: "15%",
        backgroundColor: '#46627f',
        marginLeft: "5%",
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        marginTop: 15
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },
    commenterEmail:{
        fontWeight: 'bold'
    }

})

export default Comments;