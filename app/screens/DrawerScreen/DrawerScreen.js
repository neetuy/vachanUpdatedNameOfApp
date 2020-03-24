import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, StyleSheet,ImageBackground,TouchableOpacity,Image} from 'react-native';
import { DrawerActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'

class DrawerScreen extends Component {
  
  render () {
    const valueProps  = this.props.navigation.state.routes[0].index == 1 ? (this.props.navigation.state.routes[0].routes[1].params ? this.props.navigation.state.routes[0].routes[1].params.photorUl : null) : null
 
    const iconName = [
      // {icon:'local-library',pressIcon:'Home',},
      {icon:'info',pressIcon:'About'},
      {icon:'bookmark',pressIcon:'BookMarks'},
      {icon:'highlight',pressIcon:'Highlights'},
      {icon:'note',pressIcon:'Notes'},
      {icon:'history',pressIcon:'History'},
      // {icon:'insert-comment',pressIcon:'Commentary'},
      // {icon:'image',pressIcon:'Infographics'},

      // {icon:'description',pressIcon:'Articles'},
      // {icon:'thumb-up',pressIcon:'Subscribe'},
      // {icon:'help',pressIcon:'FAQ & Help Videos'},
      // {icon:'comment',pressIcon:'Feedback'},
      // {icon:'contacts',pressIcon:'Contact Us'},
      // {icon:'account-circle',pressIcon:'Account'},
      // {icon:}

      {icon:'settings',pressIcon:'Settings'},
    ]
    return (
      <ScrollView style={{flex:1}}> 
          <View style={styles.headerContainer}>
                <ImageBackground source={require('../../assets/headerbook.jpeg')} style={{flex: 1, width: 280, justifyContent: 'center'}} >
                    <Text style={styles.headerText}>Header Portion</Text>
                     <Image source={{uri:valueProps}}
                     style={{width: 100, height: 100, borderRadius: 150/2, marginLeft: 120}}
                   />  
                </ImageBackground>
            </View>
        {
          iconName.map((iconName,index)=>
                <TouchableOpacity 
                onPress={()=>{this.props.navigation.navigate(iconName.pressIcon)}} 
                style={{
                  flex:1,
                    flexDirection:"row",
                    padding:8,
                    borderWidth: 0.3,
                    borderColor: '#d6d7da'
                }}>
                  <Icon name={iconName.icon} size={20} style={{paddingRight:16}}/>
                  <Text 
                    style={{fontSize:16}}>
                    {iconName.pressIcon}
                  </Text>
              </TouchableOpacity>
          )
        }
      
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  
  headerContainer: {
      height: 150,
  },
  headerText: {
    color: '#fff8f8',
},customText:{
   fontSize: 18,
   textAlign: 'center',
   color:'#040404'
  
}
})

const mapStateToProps = state =>{
  return{
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}


export  default connect(mapStateToProps,null)(DrawerScreen)
