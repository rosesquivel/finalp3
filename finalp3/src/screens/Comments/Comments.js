import react, { Component } from 'react';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import { db, auth } from '../../firebase/config';


class Comments extends Component {
    constructor(){
        super()
        this.state={
            listaPost: []
        }
    }

    // componentDidMount(){
    //     //Traer datos
    //     db.collection('posts').onSnapshot(
    //         posteos => {
    //             let postsAMostrar = [];

    //             posteos.forEach( unPost => {
    //                 postsAMostrar.push(
    //                     {
    //                         id: unPost.id,
    //                         datos: unPost.data()
    //                     }
    //                 )
    //             })

    //             this.setState({
    //                 listaPost: postsAMostrar
    //             })
    //         }
    //     )
    // }


    



    render(){
        console.log("En comments");
        return(
            <ScrollView>
                
                <Text style={styles.screenTitle}>Comments</Text>
                
                
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
    }

})

export default Comments;