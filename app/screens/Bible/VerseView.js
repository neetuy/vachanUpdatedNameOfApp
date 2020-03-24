import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
const Constants = require('../../utils/constants')
import {connect} from 'react-redux'
// import { styles } from './styles.js';


class VerseView extends Component {
  constructor(props){
    super(props)
    // this.Animation = new Animated.Value(0);
    // this.styles = styles(this.props.colorFile, this.props.sizeFile);    

  }
  onPress() {
    this.props.getSelection(
        this.props.index, 
        this.props.chapterNumber,
        this.props.verseData.number,
        this.props.verseData.text
    );
  }
  // matchedVerse = () =>{
  //   this.Animation.setValue(0);
  //   Animated.timing(
  //       this.Animation,
  //       {
  //           toValue: 1,
  //           duration: 2000
  //       }
  //   ).start();
  // }
  // componentDidMount(){
  //   this.matchedVerse()
  // }
  has(selectedReferences, obj) {
    for(var i = 0; i < selectedReferences.length; i++) {
      if (selectedReferences[i] == obj) {
        return true;
      }
    }
    return false;
  }
  isHighlight(){
    for(var i = 0 ;i<this.props.HightlightedVerse.length; i++ ){
      if( this.props.HightlightedVerse[i].bookId  == this.props.bookId && this.props.HightlightedVerse[i].verseNumber == this.props.verseData.number && this.props.chapterNumber == this.props.HightlightedVerse[i].chapterNumber){
        // console.log("PROPS HIGHLIGHT ",this.props.HightlightedVerse[i])
        // console.log("PROPS  ",this.props.bookId ,"  ",this.props.chapterNumber,"  ",this.props.verseData.number)
        return true
        }
    }
    return false
  }
  render() {
    let obj = this.props.chapterNumber + '_' + this.props.index + '_' + this.props.verseData.number+ '_' +this.props.verseData.text;
    let isSelect = this.has(this.props.selectedReferences, obj)
    // console.log("is selected ",isSelect)
    let isHighlight = this.isHighlight()
    // console.log("is highlighted verseArray ",this.props.HightlightedVerse)

    
    // const BackgroundColorConfig = this.Animation.interpolate(
    //   {
    //       inputRange: [ 0, 1 ],
    //       outputRange: [ '#3F51B5', '#fff', ]

    //   });

        return (
          // <Animated.Text onPress={() => {this.onPress()}} 
          <Text style ={this.props.styles.textStyle} onPress={() => {this.onPress()}} 

          // style={{
            // backgroundColor: (this.props.verseSelected == this.props.verseData.number) ?  BackgroundColorConfig : '#fff'
            // }}
            >
            <Text style={this.props.styles.verseNumber} >
              {this.props.verseData.number}{" "}
            </Text>
            <Text style={ [isSelect && isHighlight 
                    ? this.props.styles.verseTextSelectedHighlighted 
                    : !isSelect && !isHighlight 
                    ? this.props.styles.verseTextNotSelectedNotHighlighted
                    : !isSelect && isHighlight
                    ? this.props.styles.verseTextNotSelectedHighlighted
                    : this.props.styles.verseTextSelectedNotHighlighted]}
                    >
              {/* {this.getResultText(this.props.verseData.text)} */}
              {this.props.verseData.text}
            </Text>         
          </Text>
          // {/* </Animated.Text> */}


        );
     
  }
}

const mapStateToProps = state =>{
  return{
    // chapterNumber:state.updateVersion.chapterNumber,
    bookId:state.updateVersion.bookId,
    verseNumber:state.updateVersion.verseNumber,
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,

  }
}

export  default connect(mapStateToProps,null)(VerseView)