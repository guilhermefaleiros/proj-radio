import LinearGradient from "react-native-linear-gradient";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback as TWF,
  Dimensions,
  Linking,
  TouchableOpacity as TO,
  Alert,
  Text,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Share from "react-native-share";
import TrackPlayer from "react-native-track-player";
import RNExitApp from "react-native-exit-app";

TrackPlayer.setupPlayer().then(async () => {
  await TrackPlayer.add({
    id: "trackId",
    url: "http://suaradio1.dyndns.ws:8974/stream", // Link da rádio
    title: "Rádio Moloco",
    artist: "Você está conectado conosco!",
    artwork: require("./src/imgs/logomarca.png")
  });
  await TrackPlayer.play();
});

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  compactCapabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE
  ]
});

const shareLink =
  Platform.OS == "ios"
    ? "https://apps.apple.com/br/app/r%C3%A1dio-moloco/id1489473868"
    : "https://play.google.com/store/apps/details?id=br.com.radiomoloco";

export default class App extends Component {
  state = {
    isPlaying: true
  };

  playOrPause() {
    if (this.state.isPlaying === true) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
    this.setState({ isPlaying: !this.state.isPlaying });
  }

  killApp() {
    TrackPlayer.stop();
    TrackPlayer.destroy();
    RNExitApp.exitApp();
  }

  async handleShare() {
    const shareText = {
      title: "Compartilhe a Rádio Moloco com seus amigos!",
      message:
        "Que massa! Você está na Moloco, e a partir de agora está conectado conosco, curta nossa rádio!",
      url: shareLink,
      subject: "Rádio Moloco!",
      failOnCancel: false
    };
    await Share.open(shareText);
  }

  render() {
    const whatsappLink =
      "https://api.whatsapp.com/send?1=pt_BR&phone=5562985583695";
    const facebookLink = `https://www.facebook.com/radiomoloco/`;
    const instagramLink = "https://www.instagram.com/radio_moloco/";
    const siteLink = "https://radiomoloco.vipfm.net/";

    return (
      <View style={{ height: Dimensions.get("window").height, width: "100%" }}>
        <LinearGradient
          style={styles.containerGradient}
          colors={["#EEE5A2", "#E9CD6A", "#E3C04D"]}
        >
          <ImageBackground
            source={require("./src/imgs/Imagem-mulher2.png")}
            style={{
              height: Dimensions.get("window").height * 0.4,
              width: "100%"
            }}
          >
            <View
              style={{
                padding: 10,
                marginTop: 25,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TO
                onPress={() =>
                  Linking.canOpenURL(whatsappLink)
                    .then(supported => {
                      if (supported) {
                        Linking.openURL(whatsappLink);
                      } else {
                        Alert.alert(
                          "Não é possível realizar essa ação",
                          "Você não possui whatsapp em seu dispositivo! Baixe e tente novamente"
                        );
                      }
                    })
                    .catch(e => console.log(e))
                }
              >
                <Icon
                  style={styles.containerIcons}
                  name="whatsapp"
                  size={60}
                  color="yellow"
                />
              </TO>

              <TO onPress={() => Linking.openURL(facebookLink)}>
                <Icon
                  style={styles.containerIcons}
                  name="facebook-square"
                  size={60}
                  color="yellow"
                />
              </TO>

              <TO onPress={() => Linking.openURL(instagramLink)}>
                <Icon
                  style={styles.containerIcons}
                  name="instagram"
                  size={60}
                  color="yellow"
                />
              </TO>
            </View>
          </ImageBackground>

          <View style={styles.containerLogo}>
            <Image source={require("./src/imgs/logo_1.png")} />
          </View>

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

          <View
            style={{
              flexDirection: "row",
              marginTop: Dimensions.get("window").width * 0.03,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start"
            }}
          >
            <TO
              style={styles.containerShare}
              onPress={() => this.handleShare()}
            >
              <Icon name="share-alt" size={50} color="black" />
            </TO>
          </View>
          <TO onPress={() => Linking.openURL(siteLink)}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={styles.containerTexto}
            >
              WWW.RADIOMOLOCO.VIPFM.NET
            </Text>
          </TO>
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
  containerTexto: {
    marginTop: 10,
    fontFamily: "Arial",
    fontSize: 18,
    color: "black"
  },
  containerLogo: {
    width: 154,
    height: 154,
    borderRadius: 95,
    alignItems: "center",
    backgroundColor: "#000000",
    justifyContent: "center",
    borderWidth: 4,
    //borderColor: "#B0ADAA",
    borderColor: "#000000",
    marginTop: -75
    //position: "absolute",
    //top: "-25%"
  },
  containerPlay: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.05
  },

  containerIcons: {
    padding: 30,
    marginLeft: 10
  },
  containerShare: {
    marginTop: Dimensions.get("window").height * 0.03
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
    marginLeft: 10
  },
  containerGradient: {
    width: "100%",
    height: Dimensions.get("window").height,
    alignItems: "center"
  }
});
