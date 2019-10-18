import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, ImageBackground, TouchableWithoutFeedback as TWF} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class extends Component{
  state = {
    isPlaying: true
  }

  playOrPause(){
    this.setState({isPlaying: !this.state.isPlaying})
  }
  
 render(){
   return(
     <View style={{height:'100%', width: '100%'}}>
       <Image source={require('./src/imgs/Imagem-mulher2.png')} style={{flex:4, width:'100%'}}/>
      <LinearGradient style={{width:'100%', flex:6}}  colors={['#ccb611', '#ccb650']}>
        <View style={styles.containerLogo}>
            <Image style={{width: 130}} source={require('./src/imgs/logomarca.png')}/>
        </View>
        <TWF onPress={() => {this.playOrPause()}}>
        <View style={styles.containerPlay}>
          <ImageBackground style={{height: 70, width: 70, alignItems: 'center', justifyContent: 'center'}}
                source={require('./src/imgs/play-fundo.png')}>
                 {this.state.isPlaying  ? <Icon name="pause" size={30} color="gray"/> : <Image style={{marginLeft:5}}source={require('./src/imgs/play.png')}/>}
          </ImageBackground>
        </View>
        </TWF>
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
   position: 'absolute',
   justifyContent: 'center',
   alignItems: 'center',
   left: '43%',
   top: '40%'
 }
});