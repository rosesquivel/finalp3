import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text} from 'react-native/types';

class MyCamera extends Component {
    constructor(props) {
    super(props)
    this.state = {
        permisos: false, //permisos de acceso al hardware para usar la cámara
        uri: '', // aca va la url temporal interna de la foto
        mostrarCamara: true  
    }

    this.metodosDeCamara =  '' //referenciar a los métodos internos del componente cámera
}

componentDidMount(){
    Camera.requestCameraPermissionsAsync()
        .then(()=>{
            this.setState({
                permission:true,
            })
        })
        .catch(e => console.log(e))
}

render(){
    return(
        <View>
        <Camera>
            style={styles.cameraBody}
            type= {Camera.Constants.Type.front}
            ref= {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
        </Camera>

        <TouchableOpacity>
            <Text>Sacar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        </TouchableOpacity>

        </View>
    )
}
 
}

 
export default MyCamera