import React, { Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  Share,
  ToastAndroid,
  Modal,
  LayoutAnimation,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {createResponder } from 'react-native-gesture-responder';
import DbQueries from '../../utils/dbQueries'
import VerseView from './VerseView'
import AsyncStorageUtil from '../../utils/AsyncStorageUtil';
import {AsyncStorageConstants} from '../../utils/AsyncStorageConstants'
import Player from '../../screens/Bible/Navigate/Audio/Player';
import {getResultText} from '../../utils/UtilFunctions';
import {getBookNameFromMapping,getBookChaptersFromMapping,getBookNumOfVersesFromMapping} from '../../utils/UtilFunctions';
import APIFetch from '../../utils/APIFetch'
import {fetchDownloadedVersionContent,fetchVersionLanguage,fetchVersionContent,queryDownloadedBook,updateVersionBook,updateVersion} from '../../store/action/'
import SelectContent from '../Bible/component/SelectContent'
import SelectBottomTabBar from '../Bible/component/SelectBottomTabBar'
import ChapterNdAudio from '../Bible/component/ChapterNdAudio'
import Spinner from 'react-native-loading-spinner-overlay';
// import Orientation from 'react-native-orientation';
import { styles } from './styles.js';
import {connect} from 'react-redux'
import Commentary from '../StudyHelp/Commentary/'
import Dictionary from '../StudyHelp/Dictionary/'

import MainHeader from '../../components/MainHeader'
import {Card,CardItem,Content,Body,Header,Container, Button,Right,Left,Title} from 'native-base'
import BibleChapter from './component/BibleChapter';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
var arrLayout = [];

class Bible extends Component {
  static navigationOptions = ({navigation}) =>{
        const { params={} } = navigation.state 
        console.log(" parallel visible ",params.visibleParallelView && null)
        return{
          // header: params.visibleParallelView ? true : null, 
          headerLeft:()=>(
                <View style={navStyles.headerLeftStyle}>
                  <TouchableOpacity style={navStyles.touchableStyleLeft}  
                      onPress={() =>{navigation.toggleDrawer()}}>
                    <Icon 
                        name="menu"  
                        color="#fff"
                        size={20}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity style={navStyles.touchableStyleLeft} 
                      onPress={() =>{navigation.navigate("SelectionTab", {getReference:params.getRef,parallelContent:false,bookId:params.bookId,chapterNumber:params.currentChapter,totalChapters:params.numOfChapter,totalVerses:params.numOfVerse})}}> 
                      <Text  style={navStyles.headerTextStyle}>{params.bookName}  {params.currentChapter }</Text>
                    <Icon name="arrow-drop-down" color="#fff" size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{{navigation.navigate("LanguageList",{updateLangVer:params.updatelangVer})}}} style={navStyles.headerLeftStyle}>
                      <Text style={navStyles.headerTextStyle}>{params.languageName}  {params.versionCode}</Text>
                      <Icon name="arrow-drop-down" color="#fff" size={20}/>
                    </TouchableOpacity>
                </View>
            ), 
       
            headerTintColor:"#fff",
            headerStyle: {
              backgroundColor: "#3F51B5",
              elevation: 0,
              shadowOpacity: 0,
              height:40,
              // width:params.visibleParallelView ? '50%' :'100%'
          },
            headerRight:()=>(
              <View style={navStyles.headerRightStyle}>
              {params.audio &&
              <TouchableOpacity  onPress={params.toggleAudio}
                style={[navStyles.touchableStyleRight,{flexDirection:'row'}]}>
                <Icon 
                    name='volume-up'
                    size={20} 
                    color={ "#fff" }
                /> 
              </TouchableOpacity>
              }
                  <TouchableOpacity  style={[navStyles.touchableStyleRight,{flexDirection:'row'}]}>
                    <Icon 
                      onPress={()=> {params.onBookmark(params.isBookmark)}} 
                      name='bookmark'
                      color={params.isBookmark ? "red" : "#fff"} 
                      size={20} 
                  /> 
                 </TouchableOpacity>
                 <SelectContent visible={params.modalVisible} visibleParallelView={params.visibleParallelView} navigation={navigation} navStyles={navStyles} />
              </View>
            )
        }
    }
    

  constructor(props) {
    super(props);
    console.log("PROPS VALUE ",this.props)
    this.state = {
      // languageName:this.props.language,
      // languageCode:this.props.languageCode,
      // versionCode:this.props.versionCode,
      // sourceId:this.props.sourceId,
      // downloaded:this.props.downloaded,
        // bookId:this.props.bookId,
      // bookName:this.props.bookName,
      // totalChapters:this.props.totalChapters,
      // totalVerses:this.props.totalVerses,
      // verseNumber:this.props.verseNumber,
      colorFile:this.props.colorFile,
      sizeFile:this.props.sizeFile,
      downloadedBook:[],
      audio:false,
      chapterContent:[],
      error:null,
      isLoading: false,
      showBottomBar: false,
      bookmarksList: [],
      isBookmark: false,
      currentVisibleChapter:this.props.chapterNumber,
      bookNumber:this.props.bookNumber,
      selectedReferenceSet: [],
      verseInLine: this.props.verseInLine,
      bottomHighlightText:false,
      HightlightedVerseArray:[],
      gestureState: {},
      thumbSize: 100,
      left: width / 2,
      top: height / 2,

      scrollDirection:'up',
      close:true,
      message:'',
      status:false,
      modalVisible: false,
      arrLayout:[]
      //modal value for showing chapter grid 
    }

    this.getSelectedReferences = this.getSelectedReferences.bind(this)
    this.onBookmarkPress = this.onBookmarkPress.bind(this)
    // this.getReference = this.getReference.bind(this)
    this.alertPresent
    this.pinchDiff = 0
    this.pinchTime = new Date().getTime()
    this.styles = styles(this.props.colorFile, this.props.sizeFile);    
  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("NEXT PROPS ",nextProps)
  //     return{
  //       colorFile:nextProps.colorFile,
  //       sizeFile:nextProps.sizeFile,
  //       totalVerses:nextProps.totalVerses,
  //       totalChapters:nextProps.totalChapters,
  //       languageName:nextProps.language,
  //       versionCode:nextProps.versionCode,
  //       bookId:nextProps.bookId,
  //       bookName:getBookNameFromMapping(nextProps.bookId,nextProps.language),
  //       sourceId:nextProps.sourceId,
  //       downloaded:nextProps.downloaded,
  //       currentVisibleChapter:nextProps.chapterNumber,
  //   }
  // }

  scrollToVerse(verseNumber){
    if(this.state.arrLayout.length > 0){
    console.log("SCROLL TO ........  ",this.state.arrLayout, " ",this.state.arrLayout[verseNumber],"  ",verseNumber)

      // if(this.arrLayout[this.state.verseNumber+1] == this.state.verseNumber)
      this.scrollViewRef.scrollTo({
        x: 0,
        y: this.state.arrLayout[verseNumber-1],
        // animated: true,
      })
    }
  }
  componentWillReceiveProps(nextProps,prevState){
    console.log("verseInLine ",nextProps.colorFile,prevState.colorFile)
    this.setState({
      colorFile:nextProps.colorFile,
      sizeFile:nextProps.sizeFile,
      // arrLayout:nextProps.arrLayout
    })
    this.styles = styles(nextProps.colorFile, nextProps.sizeFile);  
  }
  async componentDidMount(){
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: (evt, gestureState) => true,
      onStartShouldSetResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetResponder: (evt, gestureState) => true,
      onMoveShouldSetResponderCapture: (evt, gestureState) => true,
      onResponderGrant: (evt, gestureState) => {},
      onResponderMove: (evt, gestureState) => {
        let thumbSize = this.state.thumbSize;
        if (gestureState.pinch && gestureState.previousPinch) {
          thumbSize *= (gestureState.pinch / gestureState.previousPinch)
          let currentDate = new Date().getTime()
          let diff = currentDate - this.pinchTime
          console.log("time diff : " + diff + " prev diff : " + this.pinchDiff)
          if (diff > this.pinchDiff) {
              console.log("gesture pinch diff = " + (gestureState.pinch - gestureState.previousPinch))
             if (gestureState.pinch - gestureState.previousPinch > 5) {
                // large
                console.log("large")
                this.props.screenProps.changeSizeByOne(1)              
            } else if (gestureState.previousPinch - gestureState.pinch > 5) {
                console.log("small")
                // small
                this.props.screenProps.changeSizeByOne(-1)              
            }
          }
          this.pinchDiff = diff
          this.pinchTime = currentDate
        }
        let {left, top} = this.state;
        left += (gestureState.moveX - gestureState.previousMoveX);
        top += (gestureState.moveY - gestureState.previousMoveY);
        this.setState({
          gestureState: {
            ...gestureState
          },
          left, top, thumbSize
        })  
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        })
      },
      onResponderTerminate: (evt, gestureState) => {},
      
      onResponderSingleTapConfirmed: (evt, gestureState) => {
        console.log('onResponderSingleTapConfirmed...' + JSON.stringify(gestureState));
      },
      moveThreshold: 2,
      debug: false
    })
    this.props.navigation.setParams({
      visibleParallelView:true,
      modalVisible:false,
      updatelangVer:this.updateLangVer,
      getRef:this.getReference,
      audio:this.state.audio,
      onBookmark: this.onBookmarkPress,
      toggleAudio:this.toggleAudio,
      // toggleModal:this.setState({modalVisible:!this.state.modalVisible}),
    })
    this.subs = this.props.navigation.addListener("didFocus", () =>{
    // console.log("IS DOWNLOADED ",this.props.downloaded,this.state.currentVisibleChapter,this.props.bookId)
    this.setState({isLoading:true,currentVisibleChapter:this.props.chapterNumber,bookId:this.props.bookId},()=>{
    console.log("IS DOWNLOADED ",this.props.downloaded,this.state.currentVisibleChapter,this.props.bookId)
      this.getChapter()
      this.audioComponentUpdate()
      this.getHighlights()
      this.getBookMarks()
      this.props.navigation.setParams({
        bookName:getBookNameFromMapping(this.props.bookId,this.props.language).length > 8 ? getBookNameFromMapping(this.props.bookId,this.props.language).slice(0,7)+"..." : getBookNameFromMapping(this.props.bookId,this.props.language),
        currentChapter:this.state.currentVisibleChapter,
        languageName: this.props.language, 
        versionCode: this.props.versionCode,
        bookId:this.props.bookId,
        audio:this.state.audio,
        numOfChapter:this.props.totalChapters,
        numOfVerse:this.props.totalVerses
      })
      this.setState({isLoading:false})
    })
   
      //Your logic, this listener will call when you open the class every time
    })

    
  }
  
  getReference = async(item)=>{
    if(item === null){
      return 
    }
    this.scrollToVerse(item.verseNumber)
    var time =  new Date()
    DbQueries.addHistory(this.props.sourceId,this.props.language,this.props.languageCode, this.props.versionCode, item.bookId, item.chapterNumber, this.props.downloaded, time)
    this.props.navigation.setParams({
      bookId:item.bookId,
      bookName:getBookNameFromMapping(item.bookId,this.props.language).length > 8 ? getBookNameFromMapping(item.bookId,this.props.language).slice(0,7)+"..." : getBookNameFromMapping(item.bookId,this.props.language),
      currentChapter:item.chapterNumber,
      numOfChapter:item.totalChapters,
      numOfVerse:item.totalVerses
    })
    this.props.updateVersionBook({
      bookId:item.bookId,
      bookName:item.bookName,
      chapterNumber:item.chapterNumber,
      totalChapters:item.totalChapters,
      totalVerses:item.totalVerses,
      verseNumber:item.verseNumber
    })
  }

  updateLangVer=async(item)=>{
    if(item === null){
      return
    }
    console.log('UPDATE VERSION ',item)
    var time =  new Date()
    DbQueries.addHistory(item.sourceId,item.languageName,item.languageCode, 
    item.versionCode, this.props.bookId, this.state.currentVisibleChapter, item.downloaded, time)
    this.props.updateVersion({language:item.languageName,languageCode:item.languageCode,
      versionCode:item.versionCode,sourceId:item.sourceId,downloaded:item.downloaded})
    this.props.navigation.setParams({
      languageName:item.languageName,
      versionCode:item.versionCode,
      bookName:getBookNameFromMapping(this.props.bookId,item.languageName).length > 8 ? getBookNameFromMapping(this.props.bookId,item.languageName).slice(0,7)+"..." : getBookNameFromMapping(this.props.bookId,item.languageName),
    })

  }

  async getDownloadedContent(){
      this.setState({isLoading:true})
        var content = await DbQueries.queryVersions(this.props.language,this.props.versionCode,this.props.bookId,this.props.currentVisibleChapter) 
        // console.log("content ",content)
        if(content  !=null){
          this.setState({
            downloadedBook:content[0].chapters,
            chapterContent:content[0].chapters[this.state.currentVisibleChapter-1].verses,
            isLoading:false,
            error:null,
            // currentVisibleChapter:this.state.currentVisibleChapter,
          })
        }
        else{
          alert("not able to fetch book from db")
        }
        
  }

  async getChapter(){
    try{
      console.log(" get chapter ",this.props.downloaded)
      if(this.props.downloaded){
        this.getDownloadedContent()
        }else{
          var content = await APIFetch.getChapterContent(this.props.sourceId, this.props.bookId, this.state.currentVisibleChapter)
          this.setState({chapterContent:content.chapterContent.verses,error:null,isLoading:false,currentVisibleChapter:this.state.currentVisibleChapter})
        }
        this.props.navigation.setParams({
          
          isBookmark:this.isBookmark()
        })
    }
    catch(error){
      this.setState({error:error,isLoading:false,chapterContent:[]})
    }
  }

  queryBookFromAPI = async(val)=>{
    // console.log("query book ",this.props.downloaded,this.props.language,this.props.sourceId,this.props.totalChapters,this.props.totalVerses)
    this.setState({isLoading:true,currentVisibleChapter: val != null ? this.state.currentVisibleChapter + val : this.state.currentVisibleChapter,error:null },async()=>{
          try{
            this.props.navigation.setParams({
              languageName:this.props.language,
              versionCode:this.props.versionCode,
              bookId:this.props.bookId,
              bookName:getBookNameFromMapping(this.props.bookId,this.props.language).length > 8 ? getBookNameFromMapping(this.props.bookId,this.props.language).slice(0,7)+"..." : getBookNameFromMapping(this.props.bookId,this.props.language),
              currentChapter:this.state.currentVisibleChapter,
              numOfChapter:this.props.totalChapters,
              numOfVerse:this.props.totalVerses,
              isBookmark:this.isBookmark()
            })
            if(this.props.downloaded){
              if(this.state.downloadedBook.length > 0){
               this.setState({
                chapterContent:this.state.downloadedBook[this.state.currentVisibleChapter-1].verses,
                isLoading:false
               })
              }
              else{
                // alert("not found downloaded book")
                this.getDownloadedContent()
              }
            }
            else{
                var content = await APIFetch.getChapterContent(this.props.sourceId, this.props.bookId, this.state.currentVisibleChapter)
                  console.log("fetch content",content)
                  this.setState({chapterContent:content.chapterContent.verses,isLoading:false,currentVisibleChapter:this.state.currentVisibleChapter})
            }
            // this.updateBookmark()
          }
          catch(error) {
            this.setState({isLoading:false,error:error,chapterContent:[]})
            console.log("ERROR ",error)
          }
    })
}


toggleAudio=()=>{
  if(this.state.audio){
    this.setState({status:!this.state.status})
  }
  else{
    ToastAndroid.showWithGravityAndOffset(
      "Sorry Audio is not there for this book",
       ToastAndroid.LONG,
       ToastAndroid.BOTTOM,
       25,
       50,
     )
  }
}

async audioComponentUpdate(){
  console.log("audio value ",this.state.audio)
var found = false
let res =  await APIFetch.availableAudioBook(this.props.languageCode,this.props.versionCode)
try{
if(res.length !== 0){
for (var key in res.books){
  if(key == this.props.bookId){
    found = true
    this.props.navigation.setParams({audio:true})
    this.setState({audio:true})
    break;
  }
}
  if(found==false){
    this.props.navigation.setParams({audio:false })
    this.setState({audio:false})
  }
}
}
catch(error){
this.props.navigation.setParams({audio:false})
this.setState({audio:false})
}
}

  async getHighlights(){
    let model2 = await  DbQueries.queryHighlights(this.props.language,this.props.versionCode,this.props.bookId)
    if(model2 !=null){
      for(var i = 0; i<=model2.length-1;i++){
        this.setState({HightlightedVerseArray:this.state.HightlightedVerseArray.concat({"bookId":model2[i].bookId,
        "chapterNumber":model2[i].chapterNumber,
        "verseNumber":model2[i].verseNumber})
      })
    }
    }
    else{
      this.setState({HightlightedVerseArray:[]})
    }
  }

  async getBookMarks(){
    // console.log(" ",this.props.language,this.props.versionCode,this.props.bookId,this.state.currentVisibleChapter)
    let model = await  DbQueries.queryBookmark(this.props.language,this.props.versionCode,this.props.bookId)
    console.log("BOOK MARKS ......MODEL ",model) 
    if(model != null){
    console.log("BOOK MARKS ......MODEL not null",model) 
      for(var i = 0; i<=model.length-1;i++){
      this.setState({bookmarksList:this.state.bookmarksList.concat({"bookId":model[i].bookId,
      "chapterNumber":model[i].chapterNumber})},()=>{
        this.props.navigation.setParams({isBookmark:this.isBookmark()})
      })
    }
    }
    else{
        this.setState({bookmarksList:[]})
        this.props.navigation.setParams({isBookmark:this.isBookmark()})
    }
  }

  isBookmark(){
  if(this.state.bookmarksList.length > 0){
    let isBookmark = false
          for(var i = 0; i < this.state.bookmarksList.length;i++){
            console.log("BOOKMARK LIST ",this.state.bookmarksList[i])
            console.log("current visible chapter ",this.state.currentVisibleChapter, this.props.bookId)
            if(this.state.bookmarksList[i].bookId == this.props.bookId && this.state.bookmarksList[i].chapterNumber == this.state.currentVisibleChapter){
              isBookmark = true
            }
          }
          console.log(console.log("IS BOOKMARK FUNCITON CALL ",isBookmark))
          if(!isBookmark){
            return false
          }
          else{
            return true
          }
  }
  return false
}
  //add book mark from header icon 
  onBookmarkPress(isbookmark){
    console.log("isbookmark",isbookmark)
      this.props.navigation.setParams({isBookmark:!isbookmark}) 
        //ON BOOKMARK PPRESS VALIE IS ALREADY BOOKMARKED TOGGLE IT
      if(isbookmark === false){
        this.setState({
          bookmarksList:this.state.bookmarksList.concat({"bookId":this.props.bookId,"chapterNumber":this.state.currentVisibleChapter})
        })
        DbQueries.updateBookmarkInBook(this.props.language,this.props.versionCode,this.props.bookId,this.state.currentVisibleChapter,true);
      }
      else{
        //add bookmark
        for(var i=0; i<=this.state.bookmarksList.length-1; i++){
          if(this.state.bookmarksList[i].chapterNumber == this.state.currentVisibleChapter && this.state.bookmarksList[i].bookId == this.props.bookId) {
            DbQueries.updateBookmarkInBook(this.props.language,this.props.versionCode,this.props.bookId,this.state.currentVisibleChapter,false);
            // this.setState({
            this.state.bookmarksList.splice(i, 1)
            // })
          }
        }
      }
    // })
  }


//selected reference for highlighting verse
  getSelectedReferences = (vIndex, chapterNum, vNum,text)=> {
      console.log("vIndex, chapterNum, vNum,text ",vIndex, chapterNum, vNum,text)
    let obj = chapterNum+'_' +vIndex+'_'+vNum+'_'+text
    let selectedReferenceSet = [...this.state.selectedReferenceSet]
    
    var found = false;
    for(var i = 0; i < selectedReferenceSet.length; i++) {
      if (selectedReferenceSet[i] == obj) {
        found = true;
        selectedReferenceSet.splice(i, 1);
        break;
      }
    }

    if (!found) {
      selectedReferenceSet.push(obj)
    }
    this.setState({selectedReferenceSet}, () => {
      let selectedCount = this.state.selectedReferenceSet.length, highlightCount = 0;
      for (let item of this.state.selectedReferenceSet) {
          let tempVal = item.split('_')
          for(var i=0; i<=this.state.HightlightedVerseArray.length-1; i++ ){
              if (this.state.HightlightedVerseArray[i].verseNumber == JSON.parse(tempVal[2]) && this.state.HightlightedVerseArray[i].chapterNumber ==JSON.parse(tempVal[0]) && this.state.HightlightedVerseArray[i].bookId == this.props.bookId  ) {
                highlightCount++
              }
              
          }
      }
      this.setState({showBottomBar: this.state.selectedReferenceSet.length > 0 ? true : false, bottomHighlightText: selectedCount == highlightCount ?  false : true})
    })
  }
  
  addToNotes = () => {
    let refList = []
    let id = this.props.bookId
    let name = getBookNameFromMapping(this.props.bookId,this.props.language)
    for (let item of this.state.selectedReferenceSet) {

      let tempVal = item.split('_')
      const verseNumber =  tempVal[2].toString()
      let refModel = {
        bookId: id, bookName: name, 
        chapterNumber: parseInt(tempVal[0]), 
        verseNumber: verseNumber, 
        verseText:tempVal[3],
        versionCode: this.props.versionCode, 
        languageName: this.props.language,
      };
      refList.push(refModel)
    }
    this.props.navigation.navigate('EditNote', {
      
        referenceList: refList,
        // getReference:refList,
        // bookId:id,
        onbackNote:this.onbackNote,
        // chapterNumber:this.state.currentVisibleChapter,
        // totalVerses:getBookNumOfVersesFromMapping(id,this.state.currentVisibleChapter),
        // totalChapters:getBookChaptersFromMapping(id),
        noteIndex:-1,
        // noteObject:''
    })
    this.setState({selectedReferenceSet: [], showBottomBar: false})
  }
  onbackNote=()=>{

    console.log("onback nothing in bible page")
  }
 
  //after selected reference do highlight 
  doHighlight = async () => {
    console.log(" HightlightedVerseArray ",this.state.HightlightedVerseArray)
    // let HightlightedVerseArray = [...this.state.HightlightedVerseArray]
    if (this.state.bottomHighlightText == true) {
      // do highlight
      var arr = []
      for (let item of this.state.selectedReferenceSet){
        let tempVal = item.split('_')
        await DbQueries.updateHighlightsInVerse( this.props.language, this.props.versionCode,this.props.bookId,this.state.currentVisibleChapter, tempVal[2], true)
        var highlightArr = this.state.HightlightedVerseArray
        highlightArr.push({"bookId":this.props.bookId,"chapterNumber":this.state.currentVisibleChapter,"verseNumber":JSON.parse(tempVal[2])})
        var arr = highlightArr.sort( function( a, b){ return a.verseNumber - b.verseNumber; } );
        for( var i=0; i<arr.length-1; i++ ) {
        if ( arr[i].verseNumber == arr[i+1].verseNumber ){
          arr.splice(i+1,1)
        }
        }
        }
    } else {
      // remove highlight
      for (let item of this.state.selectedReferenceSet){
        let tempVal = item.split('_')
        for(var i=0; i<=this.state.HightlightedVerseArray.length-1; i++){
          if(this.state.HightlightedVerseArray[i].chapterNumber == JSON.parse(tempVal[0]) && this.state.HightlightedVerseArray[i].verseNumber == JSON.parse(tempVal[2]) &&  this.state.HightlightedVerseArray[i].bookId == this.props.bookId) {
            await DbQueries.updateHighlightsInVerse(this.props.language, this.props.versionCode,this.props.bookId,this.state.currentVisibleChapter, tempVal[2],false)
            this.state.HightlightedVerseArray.splice(i, 1)
          }
        }
      }
    }
    this.setState({ selectedReferenceSet: [], showBottomBar: false})
  }

  //share verse
  addToShare = () => {
    let shareText = ''
    for (let item of this.state.selectedReferenceSet) {
      let tempVal = item.split('_')
      let chapterNumber= parseInt(tempVal[0])
      let vIndex= parseInt(tempVal[1])
      let verseNumber= tempVal[2]
      shareText = shareText.concat(getBookNameFromMapping(this.props.bookId,this.props.language) + " " + chapterNumber + ":" + verseNumber + " ");
      shareText = shareText.concat(tempVal[3])
      shareText = shareText.concat("\n");
    }
    Share.share({message: shareText})
    this.setState({selectedReferenceSet: [], showBottomBar: false})
  }
 
  componentWillUnmount(){

      var time =  new Date()
      DbQueries.addHistory(item.sourceId,item.languageName,item.languageCode, 
      item.versionCode, this.props.bookId, this.state.currentVisibleChapter, item.downloaded, time)
      
      this.props.updateVersionBook({
        bookId:this.props.bookId,
        bookName:getBookNameFromMapping(this.props.bookId,this.props.language),
        chapterNumber:this.state.currentVisibleChapter,
        totalChapters:this.props.totalChapters,
        totalVerses:this.props.totalVerses,
        verseNumber:this.state.verseNumber
      })

      this.props.updateVersion({language:this.props.language,languageCode:this.props.languageCode,
      versionCode:this.props.versionCode,sourceId:this.props.sourceId,downloaded:this.props.downloaded})
      this.subs.remove();
  }

  _keyExtractor = (item, index) => item.number;

 
  onScroll=(event)=> {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.state.offset ? 'down' : 'up';
    this.setState({offset:currentOffset,direction:direction})
    console.log(direction)
  }


  toggleParallelView(value){
    this.props.navigation.setParams({visibleParallelView:value})
  }
  errorMessage(){
    console.log("props ",this.props.error)
    if (!this.alertPresent) {
        this.alertPresent = true;
        if (this.state.error) {
            Alert.alert("", "Check your internet connection", [{text: 'OK', onPress: () => { this.alertPresent = false } }], { cancelable: false });
        } else {
            this.alertPresent = false;
        }
    }
  }
updateData = ()=>{
  // if(this.state.error){
    this.errorMessage()
    this.queryBookFromAPI(null)
  // }
 
}

  render() {
    // console.log("downloaded book...  ",this.state.downloadedBook[this.state.currentVisibleChapter-1].verses)
    return(
    <View  style={this.styles.container}>
      {this.state.isLoading &&
        <Spinner
        visible={true}
        textContent={'Loading...'}
        //  textStyle={styles.spinnerTextStyle}
      />}
      {(this.state.error) ?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity 
          onPress={()=>this.updateData()}
          style={{height:40,width:120,borderRadius:4,backgroundColor:'#3F51B5',
          justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'#fff'}}>Reload</Text>
          </TouchableOpacity>
        </View>
      :
      <View style={{flexDirection:'row'}}>
        <View style={{width:this.props.navigation.getParam("visibleParallelView") ? '50%' : '100%'}}>
          {this.props.navigation.getParam("visibleParallelView") &&
            <Header style={{height:40}}>
                  <Button transparent onPress={()=>{this.props.navigation.navigate("SelectionTab",{getReference:this.getReference,bookId:this.props.bookId,chapterNumber:this.state.currentVisibleChapter,totalChapters:this.props.totalChapters,totalVerses:this.props.totalVerses})}}>
                      <Title style={{fontSize:16}}>{getBookNameFromMapping(this.props.bookId,this.props.language).length > 8 ? getBookNameFromMapping(this.props.bookId,this.props.language).slice(0,7)+"..." : getBookNameFromMapping(this.props.bookId,this.props.language)} {this.state.currentVisibleChapter}</Title>
                      <Icon name="arrow-drop-down" color="#fff" size={20}/>
                  </Button>
            </Header>
          }
              <FlatList
                data={this.state.chapterContent }
                contentContainerStyle={{flexGrow:1,margin:16}}
                extraData={this.state}
                // showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => 
                  <VerseView
                      ref={child => (this[`child_${item.chapterNumber}_${index}`] = child)}
                      verseData = {item}
                      index = {index}
                      styles = {this.styles}
                      selectedReferences = {this.state.selectedReferenceSet}
                      getSelection = {(verseIndex, chapterNumber, verseNumber,text) => {
                        this.props.navigation.getParam("visibleParallelView")== false && this.getSelectedReferences(verseIndex, chapterNumber, verseNumber,text)  }}
                              
                      HightlightedVerse = {this.state.HightlightedVerseArray}
                      chapterNumber ={this.state.currentVisibleChapter}
                      showBottomBar={this.state.showBottomBar}
                  />
                }
                keyExtractor={this._keyExtractor}
                ListFooterComponent={<View style={this.styles.addToSharefooterComponent}></View>}
                // ListFooterComponentStyle={}

              />
              {/* <View style={{marginBottom:20}}/> */}
          {
            this.state.chapterContent.length > 0 &&
            <ChapterNdAudio
            styles={this.styles}
            currentVisibleChapter={this.state.currentVisibleChapter}
            status={this.state.status}
            languageCode={this.props.languageCode}
            versionCode={this.props.versionCode}
            bookId={this.props.bookId}
            totalChapters={this.props.totalChapters}
            navigation={this.props.navigation}
            queryBookFromAPI={this.queryBookFromAPI}
            />
          }
        {
          this.state.chapterContent.length > 0 &&
        this.props.navigation.getParam("visibleParallelView") ? null :
          (this.state.showBottomBar &&
            <SelectBottomTabBar 
            styles={this.styles}
            bottomHighlightText={this.state.bottomHighlightText}
            doHighlight={this.doHighlight}
            addToNotes={this.addToNotes}
            addToShare={this.addToShare}
            />)
        }
        </View>
            {/**parallelView**/}
        {
          this.props.navigation.getParam("visibleParallelView")== true && (
          <View style={{width:'50%',borderLeftWidth: 1,  borderLeftColor: '#eee'}}>
            {
              this.props.contentType == 'bible' &&
              <BibleChapter 
                currentChapter={this.state.currentVisibleChapter}
                id={this.props.bookId}
                bookName={getBookNameFromMapping(this.props.bookId,this.props.language)}
                toggleParallelView={(value)=>this.toggleParallelView(value)}
                totalChapters={this.props.totalChapters}
                totalVerses={this.props.totalVerses}
                navigation={this.props.navigation}
            /> }
            {
              this.props.contentType =='commentary' &&
              <Commentary 
              toggleParallelView={(value)=>this.toggleParallelView(value)} 
              currentVisibleChapter={this.state.currentVisibleChapter}
              // bookId={this.props.bookId}
            />
            }
            {
              this.props.contentType =='dictionary' &&
              <Dictionary 
              toggleParallelView={(value)=>this.toggleParallelView(value)} 
              currentVisibleChapter={this.state.currentVisibleChapter}
              // bookId={this.props.bookId}
            />
            }

          </View>
        )}
        </View>}
        </View>
      )
  }
}


const navStyles = StyleSheet.create({

headerLeftStyle:{
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'row',
  flex:1,
},
headerRightStyle:{
  flexDirection:'row',
  flex:1,
},
touchableStyleRight:{
    flexDirection:"row",
    marginRight:10
},
touchableStyleLeft:{
  flexDirection:"row",
    marginLeft:10,
},
headerTextStyle:{
    fontSize:16,
    color:"#fff",
    textAlign:'center'
},
})


const mapStateToProps = state =>{
  return{
    language: state.updateVersion.language,
    languageCode:state.updateVersion.languageCode,
    versionCode:state.updateVersion.versionCode,
    sourceId:state.updateVersion.sourceId,
    downloaded:state.updateVersion.downloaded,
    contentType:state.updateVersion.parallelContentType,

    chapterNumber:state.updateVersion.chapterNumber,
    totalChapters:state.updateVersion.totalChapters,
    totalVerses:state.updateVersion.totalVerses,
    bookName:state.updateVersion.bookName,
    bookId:state.updateVersion.bookId,
    fontFamily:state.updateStyling.fontFamily,

    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
    verseInLine:state.updateStyling.verseInLine,
    close:state.updateSplitScreen.close,

    // fetchedData:state.versionFetch,
    // chapterContent:state.versionFetch.chapterContent,
    // error:state.versionFetch.error,
    // verseNumber:state.updateVersion.verseNumber,
    // isLoading:state.versionFetch.loading,
    // audioURL:state.audioFetch.url,
    availableCommentaries:state.commentaryFetch.availableCommentaries,
    commentary:state.commentaryFetch.commentaryContent,

  }
}
const mapDispatchToProps = dispatch =>{
  return {
    closeSplitScreen :(close)=>dispatch(closeSplitScreen(close)),
    fetchVersionLanguage:()=>dispatch(fetchVersionLanguage()),
    fetchVersionContent:(payload)=>dispatch(fetchVersionContent(payload)),
    updateVersion: (payload)=>dispatch(updateVersion(payload)),
    queryDownloadedBook:(payload)=>dispatch(queryDownloadedBook(payload)),
    // fetchAudioUrl:(payload)=>dispatch(fetchAudioUrl(payload)),
    updateVersionBook: (value)=>dispatch(updateVersionBook(value)),
    // fetchDownloadedVersionContent:(payload)=>dispatch(fetchDownloadedVersionContent(payload))
  }
}
export  default connect(mapStateToProps,mapDispatchToProps)(Bible)