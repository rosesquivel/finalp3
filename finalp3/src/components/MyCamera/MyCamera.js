import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';


class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permisos: false, //permisos de acceso al hardware para usar la cámara.
            urlInternaFoto: '', //aca va la url temporal interna de la foto.
            mostrarCamara: true,
            subiendoFoto: false,
            fotoSubida: false
        }
        this.metodosDeCamara = '' //referenciar a los métodos internos del componente camera.
    }

    componentDidMount() {
        //Pedir permisos para uso del hardware.
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permisos: true
                })
            })
            .catch(e => console.log(e))
    }

    SacarFoto() {
        console.log('sacando foto...');
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    urlInternaFoto: photo.uri, //La ruta interna de la foto en la computadora.
                    mostrarCamara: false //escondemos la cámara para mostrar un preview de la foto al usuario.
                })
            })
            .catch(e => console.log(e))
    }

    cancelPreview() {
        this.setState({
            mostrarCamara: true
        })
    }

    guardarFoto() {
        fetch(this.state.urlInternaFoto)
            .then(res => res.blob()) //.blob() recupera datos binarios. Las fotos son archivos binarios.
            .then(image => {
                this.setState({
                    subiendoFoto: true

                })
                const ruta = storage.ref(`photos/${Date.now()}.jpg`);
                ruta.put(image)
                    .then(() => {
                        ruta.getDownloadURL() //La url de guardado de la foto.
                            .then(url => {
                                //Necesitamos guardar la url en internet como un dato más del posteo.
                                this.props.traerUrlDeFoto(url)
                                //Borra la url temporal del estado.
                                this.setState({
                                    urlInternaFoto: '',
                                    fotoSubida: true
                                })
                            })
                    })

            })
            .catch(e => console.log(e))

    }


    render() {
        return (
            <View style={styles.container}>

                {
                    this.state.permisos ?
                        this.state.mostrarCamara === false ?
                            //Preview
                            <React.Fragment>
                                <Image
                                    source={{ uri: this.state.urlInternaFoto }}
                                    style={styles.previewPhoto}
                                />
                                {/* Corregir estilos para que se vea la imagen */}
                                {/* Corregir estilos para que los botones desaparezcan una vez que el usuario aceptó o canceló el preview */}
                                {this.state.subiendoFoto ? (this.state.fotoSubida ? <Text>Image uploaded!</Text> : <Text>Uploading...</Text>) : <React.Fragment><TouchableOpacity onPress={() => this.guardarFoto()}>
                                    <Text>Accept</Text>
                                </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.cancelPreview()} >
                                        <Text>Retake</Text>
                                    </TouchableOpacity></React.Fragment>}

                            </React.Fragment>

                            :
                            //Cámara.
                            <React.Fragment>
                                {/* Corregir estilos para que se vea bien la cámara */}
                                <Camera
                                    type={Camera.Constants.Type.front}
                                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                    style={styles.cameraBody}
                                />
                                <TouchableOpacity style={styles.button} onPress={() => this.SacarFoto()}>
                                    <Text style={styles.textButton}>Take Photo</Text>
                                </TouchableOpacity>
                            </React.Fragment>
                        :
                        <Text style={styles.permisos}>Camera permits are blocked!</Text>

                }
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        //flex:1,
    },
    permisos: {
        backgroundColor: '#ffc4c4',
        borderRadius: 6,
        marginTop: 5,
        color: 'red',
        width: '100%',
        textAlign: 'center'
    },
    /*  color: "#990000",
     backgroundColor: "#FF0000",
     marginHorizontal: 10,
     borderRadius: 2 */

    cameraBody: {
        flex: 1,
        paddingBottom: '100%'
    },
    previewPhoto: {
        flex: 1,
        paddingBottom: '100%',
        width: '70vw'
    },
    button: {
        flex: 7,
        height: 37.6,
        width: 268.4,
        backgroundColor: '#46627f',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#46627f',
        marginTop: 20
    },
    textButton: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'

    },
})

export default MyCamera