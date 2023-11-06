import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';

class Profile extends Component {
    constructor(){
        super()
        this.state={
            users: []
        }
    }
    componentDidMount(){
        console.log("En profile")
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let users = [];
                docs.forEach( doc => {
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
    }

    

    render(){
        console.log(this.state);
        return(
            <View>
                <Text>Profile</Text>
                <Text>{auth.currentUser.email}</Text>
                <FlatList 
                        data= {this.state.users}
                        keyExtractor={ user => user.id }
                        renderItem={ ({item}) => <Text>Username: {item.data.username}, Owner: {item.data.owner}</Text> }
                    />
            </View>
            
        )}
        }

export default Profile;