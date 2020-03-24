import React,{Component} from 'react';
import {
  Text,
  View
} from 'react-native';
var RNFS = require('react-native-fs');




export default class Parallel extends Component {
  static navigationOptions = ({navigation}) =>{
    const { params={} } = navigation.state 

    return{
      headerTitle:(
        <View style={styles.headerLeftStyle}>
          <View style={{marginRight:10}}>
              <Text style={styles.headerTextStyle}>{params.bookName}  {params.currentChapter }</Text>
          </View>
          
        </View>
     
    ), 
    }
  }
    constructor(props){
       console.log("commentry props ",props)
      super(props)
        
    }
 
  render(){
   return(
       <Text>Parallel</Text>
   )
  }
 
}
