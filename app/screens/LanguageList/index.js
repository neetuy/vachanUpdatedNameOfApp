
import React, { Component } from 'react';
import { Text,Alert, StyleSheet,ScrollView,Dimensions, Modal,View,ActivityIndicator,TextInput,FlatList,LayoutAnimation,UIManager,Platform,TouchableOpacity} from 'react-native';
import {Card,ListItem,Left,Right,List,Accordion} from 'native-base'
import { NavigationActions,StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DbQueries from '../../utils/dbQueries'
import APIFetch from '../../utils/APIFetch'
import timestamp from '../../assets/timestamp.json'
import { getBookNameFromMapping, getBookSectionFromMapping, getBookNumberFromMapping } from '../../utils/UtilFunctions';
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
import {AsyncStorageConstants} from '../../utils/AsyncStorageConstants';
import { styles } from './styles.js';
import {connect} from 'react-redux';
import {updateVersion,updateInfographics,fetchAllContent} from '../../store/action/'
import Spinner from 'react-native-loading-spinner-overlay';

import {API_BASE_URL} from '../../utils/APIConstant'
import { State } from 'react-native-gesture-handler';

const languageList = async () => { 
  return await DbQueries.getLangaugeList()
}

class LanguageList extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Languages',
    });
    constructor(props){
      super(props)
      // console.log("LANGUAGELIST PROPS ",this.props.navigation.state.routeName)
      // if (Platform.OS === 'android') {
      //   UIManager.setLayoutAnimationEnabledExperimental(true);
      // }
        this.state = {
          isLoading: false,
          text: '',
          languages:[],
          // searchList:[],
          startDownload:false,
          index : -1,
          languageName:'',
          colorFile:this.props.colorFile,
          sizeFile:this.props.sizeFile,

      }
      this.styles = styles(this.props.colorFile, this.props.sizeFile);  
      this.fetchLanguages = this.fetchLanguages.bind(this) 
      this.alertPresent = false 
    }
   
    updateLayout(index){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const responseay = [...this.state.languages];
      responseay[index]['isExpanded'] = !responseay[index]['isExpanded'];
      this.setState(() => {
        return {
          languages: responseay,
        }
      })
    }

     componentDidMount(){
      this.fetchLanguages()  
    }

    errorMessage(){
      if (!this.alertPresent) {
          this.alertPresent = true;
          if (this.state.languages.length == 0) {
            this.fetchLanguages()
            Alert.alert("", "Check your internet connection", [{text: 'OK', onPress: () => { this.alertPresent = false } }], { cancelable: false });
            }else{
            console.log("LANGUAGEG LIST ",this.state.languages.length)
            this.alertPresent = false;
            // this.setState({languages:this.props.bibleLanguages[0].content})
          }
      }
    }
  updateData(){
      this.props.fetchAllContent()
      this.errorMessage()
  }
    async fetchLanguages(){
      console.log(" language list ")
      var lanVer = []
      // var oneDay = 24*60*60*1000; 
      // var d = new Date('1-feb-2000')
      // var ud = new Date(timestamp.languageUpdate)
      // var diffDays = Math.round(Math.abs((d.getTime() - ud.getTime())/(oneDay)))
      const languageList =  await DbQueries.getLangaugeList()
      // console.log("this.props.bibleLanguages[0]",this.props.bibleLanguages[0])
      console.log("language  ",languageList)

      if(languageList === null){
        console.log("language LIST ",languageList)
        if(this.props.bibleLanguages[0].content.length > 0){
          console.log("no language found call update ",this.props.bibleLanguages[0].content.length)
          DbQueries.addLangaugeList(this.props.bibleLanguages[0].content)
          lanVer = this.props.bibleLanguages[0].content
        }
        else{
          console.log("no language found call update ")
          this.updateData()
        }
      }
      else{
        for(var i =0 ; i<languageList.length;i++){
          lanVer.push(languageList[i])
        }
      }
      this.setState({
        languages: lanVer,
        // searchList: lanVer
      })
    }
    // SearchFilterFunction = (text)=>{
    //     const newData = this.state.searchList.filter(function(item){
    //       const itemData = item.languageName
    //       const textData = text.toLowerCase()
    //       return itemData.indexOf(textData) > -1
    //     })
    //     this.setState({
    //       text: text,
    //       languages:newData
    //     })
    // }

   
  downloadBible=async(langName,verCode,index,sourceId)=>{
      console.log("language name"+langName+" ver code  "+verCode+" source id "+sourceId)

      var bookModels = []
      try{

        this.setState({startDownload:true})
          var content = await APIFetch.getAllBooks(sourceId,"json")
        //
        // if(content){
        // console.log(" content ",content)
        // }
        var content = content.bibleContent
        for(var id in content){
          var  chapterModels = []
          if(content != null){
            for(var i=0; i< content[id].chapters.length; i++){
              var  verseModels = []
              for(var j=0; j< content[id].chapters[i].verses.length; j++){
                verseModels.push(content[id].chapters[i].verses[j])
              }
              var chapterModel = { 
                chapterNumber:  parseInt(content[id].chapters[i].header.title),
                numberOfVerses: parseInt(content[id].chapters[i].verses.length),
                verses:verseModels,
              }
              chapterModels.push(chapterModel)
            }
          }
          bookModels.push({
            languageName: langName,
            versionCode: verCode,
            bookId: id,
            bookName:getBookNameFromMapping(id,langName),
            chapters: chapterModels,
            section: getBookSectionFromMapping(id),
            bookNumber: getBookNumberFromMapping(id)
          })
        }
      var result = bookModels.sort(function(a, b){
        return parseFloat(a.bookId) - parseFloat(b.bookId);  
      })
      const booksid = await APIFetch.availableBooks(sourceId)
      var bookListData=[]
      for(var key in booksid[0].books){
        var bookId = booksid[0].books[key].abbreviation
        bookListData.push(bookId)
      }
      await DbQueries.addNewVersion(langName,verCode,result,sourceId,bookListData)
      languageList().then(async(language) => {
        this.setState({languages:language})
      })
      this.setState({startDownload:false})
      }catch(error){
      this.setState({startDownload:false})
      console.log("error ",error)
        // alert("There is some error on downloading this version please select another version")
      }
    }
 
    navigateTo(langName,langCode,verCode,sourceId,downloaded){
      console.log(" navigate to ",langName,langCode,verCode,sourceId,downloaded)
       this.props.navigation.state.params.updateLangVer({
        sourceId:sourceId,languageName:langName,languageCode:langCode, 
        versionCode:verCode,downloaded:downloaded})
        this.props.navigation.pop()
    }

    _renderHeader = (item, expanded) =>{
      return(
        <View style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center" ,
          }}>
          <Text
          style={this.styles.headerText} 
          >
          {/* {" "}{item.languageName.charAt(0).toUpperCase()+item.languageName.slice(1)} */}
          {item.languageName}
          </Text>
          <Icon  style={this.styles.iconStyle} name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up" }  size={24}/>
        </View>
      )
    }
    _renderContent = (item) =>{
      return(
        <View>
            {item.versionModels.map((element, index) => (
              <TouchableOpacity 
              style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:8}} 
               onPress={()=>{this.navigateTo(item.languageName,item.languageCode,element.versionCode,element.sourceId, element.downloaded  )}}>
                  <View>
                    <Text style={[this.styles.text,{marginLeft:8,fontWeight:'bold'}]} >{element.versionCode} </Text>
                    <Text style={[this.styles.text,{marginLeft:8}]} >{element.versionName}</Text>
                  </View>
                  <View>
                  {
                    element.downloaded == true ? 
                    <Icon style={[this.styles.iconStyle,{marginRight:8}]} name="check" size={24}  onPress={()=>{this.navigateTo(item.languageName,item.languageCode,element.versionCode,element.sourceId, element.downloaded )}}
                    />
                  :
                    <Icon  style={[this.styles.iconStyle,{marginRight:12}]} name="file-download" size={24} onPress={()=>{this.downloadBible(item.languageName,element.versionCode,index,element.sourceId)}}/>
                  }
                
                </View>
                </TouchableOpacity>
            ))}
        </View>
      )
    }
    render(){
      // console.log(" languague LIST IN RENDER ",this.state.languages)
      return (
        <View style={this.styles.MainContainer}>
        {this.props.isLoading &&
            <Spinner
            visible={true}
            textContent={'Loading...'}
            //  textStyle={styles.spinnerTextStyle}
          />}
          {this.state.startDownload &&
            <Spinner
            visible={true}
            textContent={'DOWNLOADING BIBLE...'}
            //  textStyle={styles.spinnerTextStyle}
          />}
          
            {this.state.languages.length == 0  &&
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity 
              onPress={()=>this.updateData()}
              style={{height:40,width:120,borderRadius:4,backgroundColor:'#3F51B5',justifyContent:'center',alignItems:'center'}}
              >
              <Text style={{fontSize:18,color:'#fff'}}>Reload</Text>
              </TouchableOpacity>
              </View>}
            
          
        {/* <TextInput 
          style={this.styles.TextInputStyleClass}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid='transparent'
          placeholder="Search Here"
        />   */}
        <Accordion 
          dataArray={this.state.languages}
          animation={true}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          />
       
      </View>
      )
    }
}

const mapStateToProps = state =>{
  return{
    bookId:state.updateVersion.bookId,
    chapterNumber:state.updateVersion.chapterNumber,
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
    bibleLanguages:state.contents.contentLanguages,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    updateVersion: (value)=>dispatch(updateVersion(value)),
    fetchAllContent:()=>dispatch(fetchAllContent()),

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LanguageList)
