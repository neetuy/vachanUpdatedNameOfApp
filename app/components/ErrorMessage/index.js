import React from 'react';
import {Dimensions,StyleSheet,View,Text} from 'react-native'
var { width, height } = Dimensions.get('window')

const ErrorMessage = ({message})=>(
    
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {message}
        </Text>
        <View style={[styles.overlay, { height: 360}]} />
      </View>
    
)

var styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    // Flex to fill, position absolute, 
    // Fixed left/top, and the width set to the window width
    overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      width: width
    }  
  });

  export default ErrorMessage