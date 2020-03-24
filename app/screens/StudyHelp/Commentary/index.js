import React,{Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  View
} from 'react-native';
var RNFS = require('react-native-fs');
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux'
import {Card,CardItem,Content,Body,Header,Container, Right,Left,Title,Button} from 'native-base'
import{fetchCommentaryContent} from '../../../store/action/index'
import {getBookNameFromMapping} from '../../../utils/UtilFunctions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import startEndIndex from '../../../assets/commentary_mapping'
import { NavigationEvents } from 'react-navigation';
import APIFetch from '../../../utils/APIFetch'
import { ScrollView } from 'react-native-gesture-handler';
import {styles} from './styles'


class Commentary extends Component {

    constructor(props){
      super(props)
        this.state = {
          commentary: []
        }
        this.styles = styles(this.props.colorFile, this.props.sizeFile)
        this.alertPresent =false
    }
  componentDidMount(){
    this.props.fetchCommentaryContent({parallelContentSourceId:this.props.parallelContentSourceId,bookId:this.props.bookId,chapter:this.props.currentVisibleChapter})
  }
  // componentWillMount(){
  //   this.props.fetchCommentaryContent({parallelContentSourceId:this.props.parallelContentSourceId,bookId:this.props.bookId,chapter:this.props.currentVisibleChapter})
  // }
  componentDidUpdate(prevProps) {
    console.log(" PREV PROP ",this.props.currentVisibleChapter,prevProps.currentVisibleChapter)
    if (this.props.bookId != prevProps.bookId || prevProps.currentVisibleChapter != this.props.currentVisibleChapter) {
    this.props.fetchCommentaryContent({parallelContentSourceId:this.props.parallelContentSourceId,bookId:this.props.bookId,chapter:this.props.currentVisibleChapter})
    // bar prop has changed
    }
}
  // componentDidUpdate(prevProps,prevState){
  //   if(prevProps.bookId !== this.props.bookId || this.props.chapterNumber !==this.props.currentVisibleChapter){
  //     this.props.fetchCommentaryContent({parallelContentSourceId:this.props.parallelContentSourceId,bookId:this.props.bookId,chapter:this.props.chapterNumber})
  //   }
  // }
  errorMessage(){
    console.log("props ",this.props.error)
    if (!this.alertPresent) {
        this.alertPresent = true;
        if (this.props.error) {
            Alert.alert("", "Check your internet connection", [{text: 'OK', onPress: () => { this.alertPresent = false } }], { cancelable: false });
            this.props.fetchCommentaryContent({parallelContentSourceId:this.props.parallelContentSourceId,bookId:this.props.bookId,chapter:this.props.currentVisibleChapter})
          } else {
            this.alertPresent = false;
        }
    }
  }
  updateData = ()=>{
      this.errorMessage()
  }
  render(){
    console.log("compoent parallel ",this.props.commentaryContent)
    var convertToText = (response) => {
      if(response){
        let exRegex = /<b>(.*?)<\/b>/g
        //replaced string with bld because on spliting with '<b>' tag ,all text get mixed not able to identify where to apply the bold style 
          let splitstr = response.replace(/\<br>|\<br\/>/g,"\n").replace(exRegex,'BLD<b>$1</b>BLD')
        //splited with bld will remove the bld text and will be left with b tag and ext can easily get bold
          let str = splitstr.split('BLD')
          console.log(str)
          let temp =[]
          for(var i=0;i<=str.length-1;i++){
            let matchBold = exRegex.exec(str[i])
            if(matchBold != null ){
            temp.push(<Text style={{fontWeight:'bold',fontSize:16}}>{matchBold[1]} : </Text>)
            }
            else{
              temp.push(<Text>{str[i]}</Text>)
            }
          }
          return (<Text>{temp}</Text>)
      }
      else{
        return
      }
     
    }
    return (
      <View style={this.styles.container}>
       <Header style={{height:40,borderLeftWidth:0.5,borderLeftColor:'#fff'}} >
        <Body>
          <Title style={{fontSize:16}}>{this.props.parallelContentVersionCode}</Title>
        </Body>
        <Right>
        <Button transparent onPress={()=>this.props.toggleParallelView(false)}>
          <Icon name='cancel' color={'#fff'} size={20}/>
        </Button>
        </Right>
      </Header>
      {
        (this.props.error) ?
        <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
          <TouchableOpacity 
          onPress={()=>this.updateData()}
          style={{height:40,width:120,borderRadius:4,backgroundColor:'#3F51B5',
          justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'#fff'}}>Reload</Text>
          </TouchableOpacity>
        </View>
      :
      <View style={{flex:1}}>
        <Text style={[this.styles.commentaryHeading,{margin:10}]}>{getBookNameFromMapping(this.props.bookId,this.props.parallelContentLanguage)} {  } {this.props.commentaryContent.chapter}</Text>
        {this.props.commentaryContent.bookIntro  == '' ? null :
        <View style={this.styles.cardItemBackground}>
          <Text style={this.styles.commentaryHeading}>{convertToText(this.props.commentaryContent.bookIntro)}</Text>
        </View>}
      <FlatList
        data={this.props.commentaryContent.commentaries}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow:1,margin:16}}
        renderItem={({ item }) => (
          <View style={{padding:10}}>
              {item.verse && 
              ( item.verse == 0  ? 
              <Text style={this.styles.commentaryHeading}>Chapter Intro</Text> :
              <Text style={this.styles.commentaryHeading}>Verse Number : {item.verse}</Text> 
              )} 
          <Text style={this.styles.commentaryText}>{convertToText(item.text)}</Text>
          </View>
        )}
        ListFooterComponent={<View style={{height:40,marginBottom:40}}></View>}
        
        // contentContainerStyle={{ paddingBottom: 20}}
        // keyExtractor={item => item.bookId}
      />
      </View>
      }
      </View>
    )
  }
}


const mapStateToProps = state =>{
  return{
    language: state.updateVersion.language,
    versionCode:state.updateVersion.versionCode,
    chapterNumber:state.updateVersion.chapterNumber,
    totalChapters:state.updateVersion.totalChapters,
    bookName:state.updateVersion.bookName,
    bookId:state.updateVersion.bookId,
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,

    contentType:state.updateVersion.contentType,

    parallelContentSourceId:state.updateVersion.parallelContentSourceId,
    parallelContentVersionCode:state.updateVersion.parallelContentVersionCode,
    parallelContentLanguage:state.updateVersion.parallelContentLanguage,
    commentaryContent:state.commentaryFetch.commentaryContent,
    error:state.commentaryFetch.error,
    parallelContentLanguageCode:state.updateVersion.parallelContentLanguageCode
  }

}
const mapDispatchToProps = dispatch =>{
  return {
    
    fetchCommentaryContent:(payload)=>dispatch(fetchCommentaryContent(payload)),
  }
}
export  default connect(mapStateToProps,mapDispatchToProps)(Commentary)