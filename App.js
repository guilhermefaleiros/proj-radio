import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback as TWF} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Share, {ShareSheet, Button} from 'react-native-share';

export default class extends Component{
  state = {
    isPlaying: true, // Controla o estado da rádio.
  }

  // Função que faz o botão pause/play alternar a cada toque na tela //
  playOrPause(){
    this.setState({isPlaying: !this.state.isPlaying})
  }
  /*************************************************/

 render(){
   
  const shareText = {
    title: "Compartilhe a Rádio Moloco com seus amigos!",
    message: "Que massa! Você está na Moloco, e a partir de agora está conectado conosco, curta nossa rádio!",
    url: "http://facebook.github.io/react-native/",
    subject: "Rádio Moloco" //  for email
  }

  
   
  return(
     <View style={{height:'100%', width: '100%'}}>
      <Image source={require('./src/imgs/Imagem-mulher2.png')} style={{flex:4, width:'100%'}}/>
      <LinearGradient style={{width:'100%', flex:6}}  colors={['#EEE5A2', '#E9CD6A','#E3C04D']}>

      {/* Aqui está contida a logo principal */}
        <View style={styles.containerLogo}>
            <Image style={{width: 130}} source={require('./src/imgs/logomarca.png')}/>
        </View>
      {/********************************************/}


      {/* Aqui está contido o botão de play/pause */}
        <View style={styles.containerPlay}>
          <TWF onPress={() => {this.playOrPause()}}>
            <View>
              <ImageBackground style={{height: 90, width: 90, alignItems: 'center', justifyContent: 'center'}}
                    source={require('./src/imgs/play-fundo.png')}>
                    {this.state.isPlaying  ? <Icon name="pause" size={30} color="gray"/> : <Image style={{marginLeft:5}}source={require('./src/imgs/play.png')}/>}
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

        <View style={{position: 'absolute', top:'80%', marginLeft:20}}>
          <View style={styles.containerShare}>
            <TWF onPress={() => Share.open(shareText)}>
                <Icon name="share-square-o" size={30} color="black"/>
            </TWF>
          </View>
        </View>
          
      {/**************************************************/}

      </LinearGradient>
    </View>
    
   )
 }
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 containerLogo:{
   width: 154,
   height: 154,
   borderRadius: 95,
   alignItems: 'center',
   backgroundColor: '#EDE9C1',
   justifyContent: 'center',
   borderWidth: 4,
   borderColor: '#B0ADAA',
   position: 'absolute',
   top: '-25%',
   left: '30%'
 },
  containerPlay:{
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
 },
  containerShare:{
    width: 60,
    height: 60,
    alignItems: 'center',
    backgroundColor: '#d6d3d3',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 50
  }
});