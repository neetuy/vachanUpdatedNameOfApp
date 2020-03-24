import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Header, Content, Card,CardItem, ListItem, Left, Body, Right, Switch } from 'native-base';
import { TouchableOpacity,View,Text } from 'react-native';
import {connect} from 'react-redux'
import { styles } from './styles.js';

const ListItems = [
    {
        iconName:"bookmark",
        screenName:"BookMarks",
        title:"BookMark",
    },
    {
        iconName:"highlight",
        screenName:"Highlights",
        title:"HighLights",
    },
    {
        iconName:"note",
        screenName:"Notes",
        title:"Notes",
    },
    {
        iconName:"history",
        screenName:"History",
        title:"History",
    },
    {
        iconName:"info",
        screenName:"About",
        title:"About",
    },
    {
        iconName:"settings",
        screenName:"Settings",
        title:"Settings",
    },
]
 class More extends Component {

  render() {
    this.styles = styles(this.props.colorFile, this.props.sizeFile);    
    const params = this.props.navigation.state.params
    return (
        <Container style={this.styles.container}>
        <Content>
        {
            ListItems.map((item,index)=>(
                <ListItem style = {this.styles.cardItemStyle} button={true} icon onPress={()=>{this.props.navigation.navigate(item.screenName)}}>
                <Left>
                    <Icon style ={this.styles.cardItemIconCustom}  size={24} name={item.iconName} />
                </Left>
                <Body>
                  <Text style={this.styles.textStyle}>{item.title} </Text>
                </Body>
                <Right>
                    <Icon size={24}  style ={this.styles.cardItemIconCustom} name="chevron-right" />
                </Right>
              </ListItem>
            ))
        }
        </Content>
        </Container>
    );
  }
}

const mapStateToProps = state =>{
    return{
      sizeFile:state.updateStyling.sizeFile,
      colorFile:state.updateStyling.colorFile,
    }
  }
  export  default connect(mapStateToProps,null)(More)