import React, { Component } from "react";
import { db, auth } from "../../firebase/config";
import PostInProfile from "../../components/PostInProfile/PostInProfile";
import {Image, TextInput, TouchableOpacity, View,Text,StyleSheet, FlatList, ScrollView} from "react-native";
import MyCamera from "../../components/MyCamera/MyCamera";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      usuario: [],
    };
  }
  componentDidMount(){
    console.log("En editprofile")
    console.log(this.props.route.params.userData[0].data)

    }

  

  editUser(email, pass, username, Bio, profilePic) {
/*     auth
      .createUserWithEmailAndPassword(email, pass)
      .then((response) => {
        console.log("Registrado ok", response);

        //Create user collection
        db.collection("users").doc(this.state.users.id).update({
          owner: auth.currentUser.email,
          username: this.state.username,
          bio: this.state.bio,
          profilePicture: this.state.profilePicture,
        });
      })
      .catch((error) => {
        console.log(error);
      }); */
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
            <MyCamera
              style={styles.camera}
              traerUrlDeFoto={(url) => this.traerUrlDeFoto(url)}
            />

           {/* USERNAME */}
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
              blurOnSubmit={true}
              placeholder="username"
              keyboardType="default"
              value={this.state.username}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ bio: text });
              }}
              minLength={6}
              blurOnSubmit={true}
              placeholder="password"
              keyboardType="default"
              secureTextEntry={true}
              value={this.state.password}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.isError(
                  this.state.email,
                  this.state.password,
                  this.state.username,
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
