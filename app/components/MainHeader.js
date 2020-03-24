import React, { Component } from 'react';
import {TouchableOpacity,Text} from'react-native';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'


const  MainHeader =({navStyles,languageName,languageCode,versionCode,bookName,chapterNumber,navigation,toggleAudio,onBookmark,modalVisible,})=>(
        <Header style={{height:40}}>
          <Left>
            <Button transparent>
              {/* <Icon name='menu'  color={"#fff"} size={20}/> */}
                <TouchableOpacity style={navStyles.touchableStyleLeft}  
                   onPress={() =>{navigation.navigate("SelectionTab") }}>
                    <Text  style={navStyles.headerTextStyle}>{bookName}  {chapterNumber }</Text>
                  <Icon name="arrow-drop-down" color="#fff" size={20}/>
                </TouchableOpacity>
            </Button>
          </Left>
          <Body>
            <TouchableOpacity onPress={() =>{navigation.navigate("LanguageList")}} style={navStyles.headerLeftStyle}>
                    <Text style={navStyles.headerTextStyle}>{languageName}  {versionCode}</Text>
                    <Icon name="arrow-drop-down" color="#fff" size={20}/>
            </TouchableOpacity>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='bookmark' color={"#fff"} size={20}/>
            </Button>
            <Button transparent>
              <Icon name='volume-up' color={"#fff"} size={20}/>
            </Button>
            <Button transparent>
              <Icon name='add-circle' color={"#fff"} size={20}/>
            </Button>
          </Right>
        </Header>
  
)
export default MainHeader