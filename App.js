import LinearGradient from "react-native-linear-gradient";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback as TWF,
  Dimensions,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Share from "react-native-share";
import TrackPlayer from "react-native-track-player";
import RNExitApp from "react-native-exit-app";

// Esta função cria a conexão com a rádio ao abrir o aplicativo
TrackPlayer.setupPlayer().then(async () => {
  await TrackPlayer.add({
    id: "trackId",
    url: "http://suaradio1.dyndns.ws:8974/stream", // Link da rádio
    title: "Rádio Moloco",
    artist: "Você está conectado conosco!",
    artwork: require("./src/imgs/logomarca.png")
  });
  TrackPlayer.play();
});
//**************************************/

// Define as opções do playback da rádio
TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP
  ]
});
//************************************/

export default class extends Component {
  state = {
    isPlaying: true // Controla o estado da rádio para os componentes da tela
  };

  // Função que faz o botão pause/play alternar a cada toque na tela
  playOrPause() {
    if (this.state.isPlaying === true) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  }
  /*************************************************/

  // Função que "mata" a instância do aplicativo
  killApp() {
    TrackPlayer.stop();
    TrackPlayer.destroy();
    RNExitApp.exitApp();
  }
  /*********************************************/

  render() {
    const shareOptions = {
      title: 'Share via',
      message: 'some message',
      social: Share.Social.WHATSAPP,
      whatsAppNumber: "5562982498044"
    }
    // Estrutura da mensagem que é compartilhada pelas redes sociais.
    const shareText = {
      title: "Compartilhe a Rádio Moloco com seus amigos!",
      message:
        "Que massa! Você está na Moloco, e a partir de agora está conectado conosco, curta nossa rádio!",
      url: "http://moloco.vipradios.net.br",
      subject: "Rádio Moloco!"
    };
    //***********************************************************/

    return (
      <View style={{ height: Dimensions.get('window').height, width: "100%" }}>
        <LinearGradient
          style={styles.containerGradient}
          colors={["#EEE5A2", "#E9CD6A", "#E3C04D"]}
        >
          <ImageBackground
            source={require("./src/imgs/Imagem-mulher2.png")}
            style={{ height: Dimensions.get('window').height*0.4, width: "100%" }}
          >
            {/*Aqui está contido o botão para fechar o aplicativo */}
            <View style={{padding: 10, marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.containerShare}>
                <TWF onPress={() => Linking.openURL(`whatsapp://send?text=&phone=5562985583695`)}>
                  <Icon name="whatsapp" size={35} color="black" />
                </TWF>
              </View>
              <View style={styles.containerShare}>
                <TWF onPress={() => {}}>
                  <Icon name="facebook-square" size={30} color="black" />
                </TWF>
              </View>
              <View style={styles.containerShare}>
                <TWF onPress={() => Linking.openURL('https://www.instagram.com/radio_moloco/')}>
                  <Icon name="instagram" size={30} color="black" />
                </TWF>
              </View>
              <TWF
                onPress={() => {
                  this.killApp();
                }}
              >
                <View style={styles.containerClose}>
                  <Icon name="close" size={30} color="red" />
                </View>
              </TWF>
            </View>
            {/****************************************************8*/}
          </ImageBackground>
          {/* Aqui está contida a logo principal */}
          <View style={styles.containerLogo}>
            <Image
              style={{ width: 130 }}
              source={require("./src/imgs/logomarca.png")}
            />
          </View>
          {/********************************************/}

          {/* Aqui está contido o botão de play/pause */}
          <View style={styles.containerPlay}>
            <TWF
              onPress={() => {
                this.playOrPause();
              }}
            >
              <View>
                <ImageBackground
                  style={{
                    height: 90,
                    width: 90,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  source={require("./src/imgs/play-fundo.png")}
                >
                  {this.state.isPlaying ? (
                    <Icon name="pause" size={30} color="gray" />
                  ) : (
                    <Image
                      style={{ marginLeft: 5 }}
                      source={require("./src/imgs/play.png")}
                    />
                  )}
                </ImageBackground>
              </View>
            </TWF>
          </View>
          {/*******************************************/}

          {/* Aqui está contido o botão para compartilhamento.
          A função Share.open(shareText) abre uma aba na parte inferior da tela
          que mostra opções de compartilhamento da mensagem "shareText" que foi definida
          como um objeto no início do código
      */}

          <View
            style={{
              flexDirection: 'row',
              marginTop: 30
          
            }}
          >
            <View style={styles.containerShare}>
              <TWF onPress={() => Share.open(shareText)}>
                <Icon name="share-alt" size={30} color="black" />
              </TWF>
            </View>
            
          </View>

          {/**************************************************/}
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  containerLogo: {
    width: 154,
    height: 154,
    borderRadius: 95,
    alignItems: "center",
    backgroundColor: "#EDE9C1",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#B0ADAA",
    marginTop: -75
    //position: "absolute",
    //top: "-25%"
  },
  containerPlay: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },
  containerShare: {
    width: 60,
    height: 60,
    alignItems: "center",
    backgroundColor: "#d6d3d3",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 50,
    margin: 10
  },
  containerClose: {
    width: 50,
    height: 50,
    alignItems: "center",
    backgroundColor: "#d6d3d3",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    marginLeft: 10,
  },
  containerGradient: {
    width: "100%",
    //flex: 1,
    height: Dimensions.get('window').height,
    alignItems: "center",
    //justifyContent: "center"
  }
});
