import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardItem, Content, Right, Left } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import DbQueries from '../../utils/dbQueries'
import {connect} from 'react-redux'


import { noteStyle } from './styles.js';

var moment = require('moment');

class Note extends Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'My Content',
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={() => navigation.state.params.newNote(-1)}>
         <Icon name="note-add" size={24} color="#fff"/>
     </TouchableOpacity>
    )
  });

  constructor(props){
    super(props);
    this.state = {
      colorFile:this.props.colorFile,
      sizeFile:this.props.sizeFile,
      notesData:[],
      referenceList:[],
    }
    this.styles = noteStyle(props.colorFile, props.sizeFile);   
    
    this.queryDb = this.queryDb.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

 
  
  createNewNote = (index) => {
    this.props.navigation.navigate('EditNote',{
      noteIndex:index, 
      noteObject: null,
      onDelete: this.onDelete, 
      onRefresh: this.onRefresh, 
      onbackNote:this.queryDb,
      queryDb:this.queryDb,
      referenceList:  this.props.navigation.state.params.referenceList,
      bookId: this.props.bookId,
      chapterNumber:1,
      totalVerses:null
    })
  };

  onDelete(index, time) {
    console.log("index in delete function "+index)
    if (index == -1) {
      return;
    }
    DbQueries.deleteNote(time)
    let notesData = [...this.state.notesData]
    notesData.splice(index, 1)
    this.setState({notesData})
  }

  async onRefresh(noteIndex, noteBody, crTime, moTime, refList) {
    console.log("on refresh, text " + noteBody)
    await DbQueries.addOrUpdateNote(noteIndex, noteBody, crTime, moTime, refList);
    // this.queryDb()
  }

  async queryDb() {
    let res = await DbQueries.queryNotes();
    console.log("NOTES RESULTS ............",res)
    if(res==null){
      return
    }
    this.setState({notesData: res})
  }

  

  componentDidMount(){
    this.props.navigation.setParams({ 
      newNote: this.createNewNote,
      updateNote:this.updateNote
    })
      this.queryDb()
  }

  // openNoteContent = ()=>{
    //  openNoteContent = (note,bodyText)=>{
  //   this.props.navigation.navigate("NotePage",{
  //     bodyText:bodyText,
  //     note:note,
  //     onDelete: this.onDelete, 
  //     onRefresh: this.onRefresh, 
  //     referenceList:  this.props.navigation.state.params.referenceList,
  //     bookId: this.state.bookId,
  //     versionCode: this.state.versionCode,
  //     languageName: this.state.languageName,
  //   })
  // }
  //   this.props.navigation.navigate("NotePage",{notesData:this.state.notesData})
  // }
  renderItem = ({item,index})=>{
    // console.log("item reference ",item.references[0].verseNumber)
    console.log("item reference ",item.references)

    // TODO fix max lines in WEBVIEW
    var date = new Date(item.modifiedTime);
    console.log("render : "+ item.modifiedTime + " == " + date)
    dateFormate =  date.getHours() < 24  ? moment(item.modifiedTime).fromNow() : moment(item.modifiedTime).format('DD-MMM');  
    console.log("format date "+dateFormate)

    var jparse = item.body == '' ? '' : JSON.parse(item.body)
    var strParse = jparse.replace(/<(?:.|\n)*?>/gm, '');
    var strParse1 = strParse.replace('&nbsp', ' ')
    var bodyText = strParse1 == '' ? 'No additional text' : strParse1
    
    return(
    <TouchableOpacity style={this.styles.noteContent}
        onPress={()=>{this.props.navigation.navigate("NotePage",{note:item.references,bodyText:bodyText,createdTime:item.createdTime,queryDb:this.queryDb,noteObject:item,noteIndex:index,bookId:this.props.bookId})}}>
      <Card>
      <CardItem style={this.styles.cardItemStyle}>
        <View style={this.styles.notesContentView}> 
          <Text style={this.styles.noteFontCustom} numberOfLines={2}>{bodyText}</Text>
          <View style={this.styles.noteCardItem}>
            <Text style={this.styles.noteFontCustom}>{dateFormate}</Text>
            <Icon name="delete-forever" style={this.styles.deleteIon} onPress={()=>this.onDelete(index, item.createdTime)}/>
          </View>
        </View>
        </CardItem>
        
      </Card>
    </TouchableOpacity>
   )
 }

  render() {
    return (
      <View style={this.styles.container}>
      <FlatList
        contentContainerStyle={this.state.notesData.length === 0 
          ? this.styles.centerEmptySet: this.styles.noteFlatlistCustom}
        data={this.state.notesData}
        renderItem={this.renderItem}
        ListEmptyComponent={
          <TouchableOpacity onPress={()=>this.createNewNote(-1)} 
            style={this.styles.emptyMessageContainer}>
            <Icon name="note-add"  style={this.styles.emptyMessageIcon} />
            <Text style={this.styles.messageEmpty}>Tap to create a new note</Text>
          </TouchableOpacity>
        }
      />
      </View>
    );
  }
}

const mapStateToProps = state =>{
  return{
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}

export  default connect(mapStateToProps,null)(Note)
// const mapStateToProps = state =>{
//   return{
//     language:state.updateVersion.language,
//     version:state.updateVersion.versionCode,
//     sourceId:state.updateVersion.sourceId,

//     // bookId:state.editNote.bookId,
//     // bookName:state.editNote.bookName,
//     // bodyText:state.editNote.bodyText,
//     // chapterNumber:state.editNote.chapterNumber,
//     // verseNumber: state.editNote.verseNumber,
//     // index:state.editNote.index,
//     // referenceNote:state.editNote.referenceNote,
    
//   }
// }

// // const mapDispatchToProps = dispatch =>{
// //   return {
// //     updateNoteBody:(text)=>dispatch(updateNoteBody(text))
// //   }
// // }


// export  default connect(mapStateToProps,mapDispatchToProps)(EditNote)