import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SelectionGrid from '../../../components/SelectionGrid/';
import { numberSelection } from './styles.js';
import {connect} from 'react-redux'

 class SelectVerse extends Component {
   
  constructor(props){
    super(props)
    this.state = {
      verseData:Array.from(new Array(this.props.screenProps.totalVerses), (x,i) => i+1),
    }
    this.styles = numberSelection(this.props.colorFile, this.props.sizeFile);   

  }
  static getDerivedStateFromProps(nextProps, prevState) {
      return{verseData:Array.from(new Array(nextProps.screenProps.totalVerses), (x,i) => i+1)}
  }
 
  onVerseSelected=(item,index)=> {
    this.props.screenProps.updateSelectedVerse(item,index)
  }
  
  render() {
    console.log("verseData ",this.state.totalVerses)
    return (
      <SelectionGrid
      styles={this.styles}
      onNumPress={(item)=>{this.onVerseSelected(item)}}
      numbers={this.state.verseData}
      loader={this.state.isLoading}
      />
    );
  }
}

const mapStateToProps = state =>{
  return{
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}
 export default connect(mapStateToProps,null)(SelectVerse)
