import react, { Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db, auth } from '../../firebase/config';
import { AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length,
            comments: this.props.infoPost.datos.comments.slice(0, 4),
        }
    }

    componentDidMount() {
        console.log('En post')
        //Indicar si el post ya está likeado o no.
        if (this.props.infoPost.datos.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }
    }



    likear() {
        //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.

        //update en base de datos
        db.collection('posts').doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(res => {
                this.setState({
                    like: true,
                    cantidadDeLikes: this.props.infoPost.datos.likes.length
                })
            })
            .catch(e => console.log(e))


    }

    unLike() {
        //Quitar del array de likes al usario que está mirando el post.
        db.collection('posts').doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(res => {
                this.setState({
                    like: false,
                    cantidadDeLikes: this.props.infoPost.datos.likes.length
                })
            })
            .catch(e => console.log(e))
    }


    render() {
        return (
            <View style={styles.unPostContainer}>
                <TouchableOpacity onPress={() => this.props.navigate('OtherProfile', { userData: this.props.infoPost.datos.owner, navigation: this.props.navigation })}>
                    <Text style={styles.text}><EvilIcons name="user" size={18} color='#46627f' />{this.props.infoPost.datos.owner}</Text>
                </TouchableOpacity>
                <Image
                    style={styles.image}
                    source={this.props.infoPost.datos.fotoUrl}
                    resizeMode="contain"
                />
                <Text>{this.props.infoPost.datos.textoPost}</Text>

                <View style={styles.containerUnidor}>
                    <TouchableOpacity onPress={() => this.props.navigate('Comments', { infoPost: this.props.infoPost, navigation: this.props.navigation })}>
                        <Text style={styles.linkToComments}><FontAwesome name="commenting-o" size={18} color="46627f" />{this.props.infoPost.datos.comments.length}</Text>
                    </TouchableOpacity>
                    {/* If ternario */}
                    {this.state.like ?
                        <TouchableOpacity onPress={() => this.unLike()}>
                            <Text> <AntDesign name="heart" size={18} color="red" />{this.state.cantidadDeLikes}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.likear()}>

                            <Text> <AntDesign name="hearto" size={18} color="black" />{this.state.cantidadDeLikes}</Text>
                        </TouchableOpacity>
                    }
                </View>
                {this.props.infoPost.datos.comments && this.props.infoPost.datos.comments.length > 0 ?
                    <FlatList
                        data={this.state.comments}
                        keyExtractor={key => key.text + key.user}
                        initialNumToRender={4}
                        renderItem={(comment) =>
                            <View style={styles.showComments}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', { userData: comment.item.useremail, navigation: this.props.navigation })}>
                                    <Text style={styles.text}>{comment.item.userEmail}:</Text>
                                </TouchableOpacity>
                                <Text style={styles.uglyText}>{comment.item.text}</Text></View>}
                    /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    unPostContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },

    linkToComments: {
        color: '#2b40a6'
    },
    lista: {},
    commentSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginVertical: 10
    },
    image: {
        width: 300,
        height: 150,
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
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },

    //CONTAINER UNIDOR
    containerUnidor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        marginTop: 10,
    },
    //LIKES CONTAINER
    likesContainer: {
        marginRight: 100,
    },


    showComments: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5
    },


    //TEXTO
    text: {
        color: '#46627f',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 'bold'
    },
    uglyText: {
        fontSize: 11,
        marginLeft: 5,
        textAlign: 'center'
    }
})


export default Post;