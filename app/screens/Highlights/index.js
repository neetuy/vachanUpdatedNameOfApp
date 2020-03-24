import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DbQueries from '../../utils/dbQueries'
import {getBookNameFromMapping,getBookChaptersFromMapping,getBookNumOfVersesFromMapping} from '../../utils/UtilFunctions';
import { highlightstyle } from './styles'
import {connect} from 'react-redux'
import {updateVersionBook} from '../../store/action/'

class HighLights extends Component {
  static navigationOptions = {
    headerTitle: 'Highlights',
    // headerRight:(
    //   <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
    //   <TextInput
    //   // placeholder="Search"
    //   underlineColorAndroid = '#fff'
    //   placeholderTextColor={'#fff'} 
    //   returnKeyType="search"
    //   multiline={false}
    //   numberOfLines={1}
    //   style={{width:Dimensions.get('window').width/4}}
     
    // />
    //   <Icon name='search' color="#fff" size={28} style={{marginHorizontal:8}} />
    // </View>
    // )
  };

  constructor(props) {
    super(props)
    this.state = {
      HightlightedVerseArray:[],
    }
    this.styles = highlightstyle(this.props.colorFile, this.props.sizeFile);  
    
  }
  async getHighlights(){
    let model2 = await  DbQueries.queryHighlights(this.props.languageName,this.props.versionCode,null)
    if(model2  == null ){
    }
    else{
      if(model2.length > 0){
        console.log("model  ",model2)
        for(var i = 0; i<=model2.length-1;i++){
          this.setState({
            HightlightedVerseArray:[...this.state.HightlightedVerseArray,model2[i]]
          })
        }
      }
  }
  }
  removeHighlight = async( chapterNum,verseNum)=>{
    for(var i=0; i<=this.state.HightlightedVerseArray.length-1; i++){
      if(this.state.HightlightedVerseArray[i].chapterNumber == chapterNum && this.state.HightlightedVerseArray[i].verseNumber == verseNum){
        this.state.HightlightedVerseArray.splice(i, 1)
        await DbQueries.updateHighlightsInVerse(this.props.languageName, this.props.versionCode,this.props.bookId,chapterNum,verseNum,false)
        this.setState({HightlightedVerseArray:this.state.HightlightedVerseArray})
      }
    }
  }
  componentDidMount(){
    this.getHighlights()
  }
  navigateToBible=(item)=>{
    console.log("item HIGHIGHTS ",item)
    this.props.updateVersionBook({
      bookId:item.bookId, 
      bookName:getBookNameFromMapping(item.bookId,item.languageName),
      chapterNumber:item.chapterNumber,
      totalChapters:getBookChaptersFromMapping(item.bookId),
      totalVerses:getBookNumOfVersesFromMapping(item.bookId,item.chapterNumber),
      verseNumber:item.verseNumber
    })
    this.props.navigation.navigate("Bible")
  }
  render() {
    console.log("langugueg name "+this.props.languageName)
    return (
      <View style={this.styles.container}>
      <FlatList
      contentContainerStyle={this.state.HightlightedVerseArray.length === 0 && this.styles.centerEmptySet}
      data={this.state.HightlightedVerseArray}
      ListEmptyComponent={
        <View style={this.styles.emptyMessageContainer}>
        <Icon name="border-color" style={this.styles.emptyMessageIcon}/>
          <Text
            style={this.styles.messageEmpty}
          >
           No reference highlighted</Text>
        </View>
       
        }
      // getItemLayout={this.getItemLayout}
      renderItem={({item, index}) =>
      <TouchableOpacity style={this.styles.highlightsView}
        onPress = {()=>this.navigateToBible(item)}
      >
         <Text style={this.styles.hightlightsText}>
          {getBookNameFromMapping(item.bookId,item.languageName)} {':'} {item.chapterNumber} {':'} {item.verseNumber}
          </Text>
        <Icon name='delete-forever' style={this.styles.iconCustom}  onPress={() => {this.removeHighlight(item.chapterNumber,item.verseNumber)}} />
      </TouchableOpacity>
    }
      />
      </View>
    );
  }
}

const mapStateToProps = state =>{
  return{
    languageName: state.updateVersion.language,
    versionCode:state.updateVersion.versionCode,
    bookId:state.updateVersion.bookId,
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    updateVersionBook:(value)=>dispatch(updateVersionBook(value))
  }
}

export  default connect(mapStateToProps,mapDispatchToProps)(HighLights)