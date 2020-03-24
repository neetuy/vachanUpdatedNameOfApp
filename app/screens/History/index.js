import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput
} from 'react-native';
import DbQueries from '../../utils/dbQueries'
import { View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Accordion} from 'native-base';
import {updateVersion,updateVersionBook} from '../../store/action/'
import {getBookNameFromMapping,getBookChaptersFromMapping,getBookNumOfVersesFromMapping} from '../../utils/UtilFunctions'
import {List,ListItem} from 'native-base'
import { historyStyle } from './styles.js'
import {connect} from 'react-redux'


var moment = require('moment');

 class History extends Component{
  static navigationOptions = {
    headerTitle: 'History',
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
  
  constructor(props){
    super(props)
    this.state = {
      historyList: [
        { time: "Today", list: [] },
        { time: "Yesterday", list:[] },
        { time: "1 week ago", list:[] },
        { time: "1 month ago", list:[] },
        { time: "2 months ago", list:[] }
    ],
    isLoading:false
    }
    this.styles = historyStyle(props.colorFile, props.sizeFile);       
    this.onClearHistory = this.onClearHistory.bind(this)

    this.props.navigation.setParams({
      onClearHistory:this.onClearHistory,
      historyListLength:0
    })
  }

  async componentDidMount(){
    this.setState({isLoading: true}, async () => {
      let historyData  = await DbQueries.queryHistory()
      console.log("query history ",historyData)

      if (historyData) {
        let historyList = [...this.state.historyList]
        var date = new Date()
        var cur = moment(date).format('D')
          for(i=0; i < historyData.length; i++){
            var end = moment(historyData[i].time).format('D')
            var timeDiff =  Math.floor(cur-end)
            if(timeDiff == 0){
              historyList[0].list.push(historyData[i])
            }
            if(timeDiff == 1){
              historyList[1].list.push(historyData[i])
            }
            if(timeDiff >= 2 && timeDiff <= 7){
              historyList[2].list.push(historyData[i])
            }
            if(timeDiff > 7 && timeDiff <= 30){
              historyList[3].list.push(historyData[i])
            }
            if(timeDiff > 30 ){
              historyList[4].list.push(historyData[i])
            }
          }

          for(i=0; i < historyList.length; i++){
            if (historyList[i].list.length  == 0) {
              historyList.splice(i, 1)
              i--;
            }
          }
          this.setState({historyList,isLoading:false})
          this.props.navigation.setParams({
            historyListLength:historyList.length,
           
          })

      }
    })


}
  
 
  onClearHistory = () =>{
    console.log("hi clear history")
    DbQueries.clearHistory()
    this.setState({historyList: []})
    this.props.navigation.setParams({
      historyListLength:0
    })
  }

  _renderHeader = (data, index, isActive) =>{
    return (
      <View>
        <View  style={this.styles.historyHeader}>
         <Text style={this.styles.accordionHeaderText}>{data.time}</Text>
         <Icon name={isActive ? "keyboard-arrow-down" : "keyboard-arrow-up" } style={this.styles.iconCustom} />
        </View>
      </View> 
    )
  }
  goToContent(item){
    console.log(" version Code ",item.versionCode,"getBookChaptersFromMapping ",getBookChaptersFromMapping(item.bookId)," getBookNumOfVersesFromMapping ",getBookNumOfVersesFromMapping(item.bookId,item.chapterNumber))
    this.props.updateVersion({language:item.languageName,languageCode:item.languageCode,
      versionCode:item.versionCode,sourceId:item.sourceId,
      downloaded:item.downloaded})
    this.props.updateVersionBook({
      bookId:item.bookId, 
      bookName:getBookNameFromMapping(item.bookId,item.languageName),
      chapterNumber:item.chapterNumber,
      totalChapters:getBookChaptersFromMapping(item.bookId),
      totalVerses:getBookNumOfVersesFromMapping(item.bookId,item.chapterNumber),
      // verseNumber:item.verseNumber
    })
    this.props.navigation.navigate("Bible")
  }
  
  _renderContent  = (data) => {
    console.log("is active ")
    console.log("version model"+JSON.stringify(data))
    return (
      <View>
        {
          this.state.isLoading ? <ActivityIndicator animate = {true}/> : 
            data.list.map((item, index) => 
            <TouchableOpacity onPress={()=>{this.goToContent(item)}}>

              <Text style={this.styles.contentText}> {item.languageName} : {getBookNameFromMapping(item.bookId,item.languageName)} : {item.chapterNumber} </Text>
            </TouchableOpacity>
            )
           
        }
       
        </View>
    )
  }

  render(){
     return (
     <View style={this.styles.container}>
      {
        this.state.historyList.length == 0 ? 
        <View style={this.styles.emptyMessageContainer}>
        <Icon name="import-contacts" style={this.styles.emptyMessageIcon}/>
          <Text style={this.styles.messageEmpty}>
            Start reading
          </Text>
          
        </View>
      :
    
        <Accordion
          dataArray={this.state.historyList}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        /> 
      }
    </View>
    )
  }
}

const mapStateToProps = state =>{
  return{
    languageName: state.updateVersion.language,

    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    updateVersion: (value)=>dispatch(updateVersion(value)),
    updateVersionBook:(value)=>dispatch(updateVersionBook(value))
  }
}

export  default connect(mapStateToProps,mapDispatchToProps)(History)