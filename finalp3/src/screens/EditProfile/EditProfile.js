import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import {Image, TextInput, TouchableOpacity, View,Text,StyleSheet, FlatList, ScrollView} from "react-native";
import MyCamera from "../../components/MyCamera/MyCamera";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: this.props.route.params.userData[0],
      fotoUrl: this.props.route.params.userData[0].data.profilePicture,
      newBio: this.props.route.params.userData[0].data.bio,
      newUsername: this.props.route.params.userData[0].data.username
    };
  }
  componentDidMount() {
    console.log("En editProfile");
    console.log(this.state.usuario);
  }
 
  componentDidUpdate() {
    console.log(this.state)
  }
  

  editUser(newUsername, newBio, newPicture) {
    
    db.collection('users').doc(this.state.usuario.id).update({
        bio: newBio,
        username: newUsername,
        profilePicture: newPicture
    })
        .then(res => {
            this.setState({
                
            })
        })
        .catch(e => console.log(e))
  }

  traerUrlDeFoto(url) {
    this.setState({
      fotoUrl: url,
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.right}>
          <View style={styles.firstBox}>

            {/* FOTO DE PERFIL */}
            <Text >Nueva foto de Perfil</Text>
            <MyCamera
              style={styles.camera}
              traerUrlDeFoto={(url) => this.traerUrlDeFoto(url)}
            />

           {/* USERNAME */}
           <Text >Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ newUsername: text });
              }}
              blurOnSubmit={true}
              placeholder="new username"
              keyboardType="default"
              value={this.state.newUsername}
            />
            <Text >Biografía</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ newBio: text });
              }}
              blurOnSubmit={true}
              placeholder="bio"
              keyboardType="default"
              value={this.state.newBio}
            />
            <Text >Verifique que su foto se haya subido correctamente antes de clickear el boton</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.editUser(
                  this.state.newUsername,
                  this.state.newBio,
                  this.state.fotoUrl
                )
              }
            >
              <Text style={styles.textButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Profile')}>
                    <Text style={styles.textButton}>Back</Text>{/* ver si existe styles Text button, lo saque de profile */}
                </TouchableOpacity>
        <Text style={styles.footerText}>
          Esquivel - García Devesa - Manoukian
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //CONTENEDOR GENERAL
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",  
    alignItems: "center",
    marginBottom: 5,
  },

  //PANTALLA CON FORM

  right: {
    flex: 1,
    justifyContent: "center",
  },

  firstBox: {
    backgroundColor: "#EEEEEE",
    borderRadius: 6,
    padding: 70,
    marginVertical: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
  },

  secondBox: {
    borderRadius: 6,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
    alignItems: "center",
  },

  loginText: {
    color: "#46627f",
    fontWeight: "bold   ",
  },

  image: {
    height: 80,
    width: "100%",
  },

  //checkbox
  checkboxContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
  },

  //FOOTER

  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#222f3d",
  },

  //CONFIGURACIONES GENERALES
  input: {
    height: 37.6,
    width: 268.4,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
  },

  button: {
    height: 37.6,
    width: 268.4,
    backgroundColor: "#46627f",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#46627f",
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default EditProfile;