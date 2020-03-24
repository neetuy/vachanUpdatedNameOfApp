import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  TouchableHighlight,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import FlowLayout from '../../components/FlowLayout'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  Menu,
  MenuContext,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
  renderers
} from 'react-native-popup-menu';
const { width, height } = Dimensions.get('window')

const { SlideInMenu } = renderers;
import { HeaderBackButton, NavigationActions } from 'react-navigation-stack';
import  CNRichTextEditor , { CNToolbar, getInitialObject , getDefaultStyles } from "react-native-cn-richtext-editor";
// import {RichTextEditor, actions} from 'react-native-zss-rich-text-editor';
// import RichTextToolbar from '../../utils/RichTextToolbar'
import { noteStyle } from './styles.js';
import DbQueries from '../../utils/dbQueries'
import APIFetch from '../../utils/APIFetch'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';

const defaultStyles = getDefaultStyles();
// const iconSet =
class EditNote extends Component {
  static navigationOptions = ({navigation}) =>({
    headerTitle: 'Edit Note',
    headerLeft:(<HeaderBackButton tintColor='white' onPress={()=>navigation.state.params.handleBack()}/>),
    headerRight:(
      <TouchableOpacity style={{margin:8}} onPress={()=>navigation.state.params.handleAdd()}>
        <Text style={{fontSize:12,color:'#fff'}}>DONE</Text>
      </TouchableOpacity>
      ),
    
  });

  constructor(props){
    super(props);
    this.state = {
        noteIndex: this.props.navigation.state.params.noteIndex,
        noteObject:this.props.navigation.state.params.noteObject,
        noteBody: this.props.navigation.state.params.noteIndex == -1 ? '' : this.props.navigation.state.params.noteObject.body == '' ? '' : JSON.parse(this.props.navigation.state.params.noteObject.body),
        referenceList:this.props.navigation.state.params.noteIndex == -1 
          ? [] 
          : this.props.navigation.state.params.referenceList,
        // todo here fix reference list
        referenceList2: this.props.navigation.state.params.referenceList ,
        isLoading:false,
        verseText:'',
        selectedStyles : [],
        selectedTag : 'body',
        noteBody: [getInitialObject()],
//
        selectedTag : 'body',
            selectedColor : 'default',
            selectedHighlight: 'default',
            colors : ['red', 'green', 'blue'],
            highlights:['yellow_hl','pink_hl', 'orange_hl', 'green_hl','purple_hl','blue_hl'],
            selectedStyles : [],
            // value: [getInitialObject()] get empty editor
            // value: convertToObject('<div><p><span>This is </span><span style="font-weight: bold;">bold</span><span> and </span><span style="font-style: italic;">italic </span><span>text</span></p></div>'
            // , this.customStyles)

    }

    this.styles = noteStyle(props.colorFile, props.sizeFile);   
    
    this.getReference = this.getReference.bind(this)
    this.openReference = this.openReference.bind(this)
    this.deleteReference = this.deleteReference.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

    this.getHtml = this.getHtml.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    // this.getHtml();
  }

  async getHtml() {
    // const body = await this.richtext.getContentHtml();
    // if(body==''){
    // return body
    // }
    // return JSON.stringify(body)
  }

  setFocusHandlers() {
    // this.richtext.setContentFocusHandler(() => {
    //   alert('content focus');
    // });
  }

  saveNote = async () =>{
    var time =  new Date()
    console.log("time "+time)
    var contentBody = await this.getHtml()

    if (contentBody == '' && this.state.referenceList.length == 0) {
      if(this.state.noteIndex != -1){
        // delete note
        this.props.navigation.state.params.onDelete(this.state.noteIndex, this.state.noteObject.createdTime)
      }
    } else {
      console.log("add new note ",contentBody)
      await DbQueries.addOrUpdateNote(this.state.noteIndex, contentBody, 
      this.state.noteIndex == -1 ? time : this.state.noteObject.createdTime, time, this.state.referenceList);
      this.props.navigation.state.params.onbackNote(this.state.referenceList,contentBody)
    }
    this.props.navigation.dispatch(NavigationActions.back())
    // this.props.navigation.pop()
  }

  showAlert() {
    Alert.alert(
      'Save Changes ? ',
      'Do you want to save the note ',
      [
        {text: 'Cancel', onPress: () => {return}},
        {text: 'No', onPress: () => { this.props.navigation.dispatch(NavigationActions.back()) }},
        {text: 'Yes', onPress: () => this.saveNote()},
      ],
    )
  }

  onBack = async () =>{
    var contentBody = await this.getHtml()
      if (this.state.noteIndex == -1) {
        console.log("content body on back "+contentBody)
        if (contentBody != '' || this.state.referenceList.length > 0) {
          console.log("if content body is not empty ")
          this.showAlert();
          return
        }
      } 
      else {
        if(contentBody !== this.props.navigation.state.params.noteObject.body 
            || !this.checkRefArrayEqual()){
              console.log("changes to content body changes ")
            this.showAlert();
          return
        }
      }
      
    this.props.navigation.dispatch(NavigationActions.back())
  }

  checkRefArrayEqual() {
    let initArray = this.props.navigation.state.params.noteObject.references;
    let nowArray = this.state.referenceList;
    if (initArray.length != nowArray.length) {
      return false;
    }
    for (var i=0; i<initArray.length; i++) {
      if (initArray[i].bookId != nowArray[i].bookId ||
          initArray[i].bookName != nowArray[i].bookName ||
          initArray[i].chapterNumber != nowArray[i].chapterNumber ||
          initArray[i].verseNumber != nowArray[i].verseNumber) {
            return false;
      }
    }
    return true;
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleAdd: this.saveNote})
    this.props.navigation.setParams({ handleBack: this.onBack})
    // this.subs = this.props.navigation.addListener("didFocus", () =>{
    //   // this.getReference(item)
      this.addRef2()

    // })
  }
  // componentWillUnmount(){
  //     this.subs.remove();
  // }
  onChangeText = (text)=>{
    this.setState({noteBody:text})
  }

  checkIfReferencePresent(id, name, cNum, vNum) {
    let referenceList = [...this.state.referenceList]
    for(var i = 0; i < referenceList.length; i++) {
      let ref = referenceList[i];
      if (ref.bookId == id && ref.bookName == name && ref.chapterNumber == cNum && ref.verseNumber == vNum) {
        return true;
      }
    }
    return false;
  }

  addRef2() {
    if (this.state.referenceList2) {
      if (this.state.noteIndex == -1) {
        this.setState({referenceList: this.state.referenceList2})
      } else {
        let referenceList = [...this.state.referenceList]        
        for (var i=0; i<this.state.referenceList2.length; i++) {
          let item = this.state.referenceList2[i]
          const verseNumber = item.verseNumber.toString()
          if (!this.checkIfReferencePresent(item.bookId, item.bookName, item.chapterNumber,verseNumber)) {
            referenceList.push(item)
          }
        }
        this.setState({referenceList})
      }
    }
  }
  async getDownloadedContent(item){
    this.setState({isLoading:true})
    //later change it to write query for getting text from realm
      var content = await DbQueries.queryTextForNote(this.props.language,this.props.versionCode,item.bookId,item.chapterNumber,item.verseNumber) 
      // console.log("content ",content)
      if(content  !=null){
        //  content
        this.setState({
          verseText:content,
        })
      }
      else{
        alert("not abel to fetch book from db")
      }
      
}
   getChapter=async(item)=>{
    try{
      // console.log("notes making ",this.props.downloaded,item)
      if(this.props.downloaded){
         await this.getDownloadedContent(item)
        }else{
          var content = await APIFetch.getChapterContent(this.props.sourceId, item.bookId, item.chapterNumber)
          // if(content.length >0 && content.success){
          //  content.chapterContent.verses[item.verseNumber-1].text
          // }
          this.setState({verseText:content.chapterContent.verses[item.verseNumber-1].text})
      }
    }
    catch(error){
      this.setState({error:error,isLoading:false,chapterContent:[]})
    }
  }


  getReference = (item) => {
    console.log("get reference ",item)
    // if(item)
    if (this.checkIfReferencePresent(item.bookId, item.bookName, item.chapterNumber, item.verseNumber)) {
      return;
    }
    try{
      this.setState({isLoading:true},async()=>{
      console.log(" verse text ",await this.getChapter(item))
      await this.getChapter(item)        
      // let response =  await APIFetch.getChapterContent(this.props.sourceId,item.bookId,item.chapterNumber)
        // console.log("SOURCE ID ",this.props.sourceId,"BOOK ID ",item.bookId,"Chapter number",item.chapterNumber)
        // if(response.length != 0){
        //   console.log("res -------",response)
    
        //   if(response.success == false){
    
        //     alert("response success false")
        //   }else{
          // console.log("verse text",this.state.verseText)
            let refModel = {
              bookId:item.bookId, 
              bookName:item.bookName, 
              chapterNumber: item.chapterNumber, 
              verseNumber: item.verseNumber.toString(), 
              verseText:this.state.verseText,
              versionCode: this.props.versionCode, 
              languageName: this.props.language
            };
            let referenceList = [...this.state.referenceList]
            referenceList.push(refModel)
            this.setState({referenceList,isLoading:false})
          // }
        // }
      })
 
  }
    catch(error){
      console.log(error)
    }
   
  }

  onAddVersePress() {
    this.props.navigation.navigate('SelectionTab', {
      getReference: this.getReference,
      parallelContent:false,
      bookId:this.props.bookId,
      // bookName:this.props.navigation.state.params.bookName,
      chapterNumber:this.props.chapterNumber,
      totalVerses:this.props.totalVerses,
      totalChapters:this.props.totalChapters,
      // verseNumber:this.props.navigation.state.params.verseNumber
    })
  }
  
  openReference(index) {
    // todo open reference in RV page
    var list = this.state.referenceList
    var item = list[index]
    this.props.navigation.navigate('Bible', {bookId: item.bookId, bookName: item.bookName, 
      chapterNumber: item.chapterNumber, verseNumber: item.verseNumber})
  }

  deleteReference(index) {
    let referenceList = [...this.state.referenceList]
    referenceList.splice(index, 1);
    this.setState({referenceList})
  }


  onStyleKeyPress = (toolType) => {
    console.log("tool type ",toolType)
    this.editor.applyToolbar(toolType);
}

onSelectedTagChanged = (tag) => {
    this.setState({
        selectedTag: tag
    })
}

// onSelectedStyleChanged = (styles) => { 
//     this.setState({
//         selectedStyles: styles,
//     })
// }

onSelectedStyleChanged = (styles) => { 
  const colors = this.state.colors;  
  const highlights = this.state.highlights;  
  let sel = styles.filter(x=> colors.indexOf(x) >= 0);

  let hl = styles.filter(x=> highlights.indexOf(x) >= 0);
  this.setState({
      selectedStyles: styles,
      selectedColor : (sel.length > 0) ? sel[sel.length - 1] : 'default',
      selectedHighlight : (hl.length > 0) ? hl[hl.length - 1] : 'default',
  })
 
}

onValueChanged = (value) => {
    this.setState({
      noteBody: value
    });
}
renderHighlightMenuOptions = () => {
  let lst = [];

  if(defaultStyles[this.state.selectedHighlight]) {
       lst = this.state.highlights.filter(x => x !== this.state.selectedHighlight);
       lst.push('default');
      lst.push(this.state.selectedHighlight);
  }
  else {
      lst = this.state.highlights.filter(x=> true);
      lst.push('default');
  }
  
  

  return (
      
      lst.map( (item) => {
          let bgColor = defaultStyles[item] ? defaultStyles[item].backgroundColor : 'black';
          return (
              <MenuOption value={item} key={item}>
                  <MaterialCommunityIcons name="marker" color={bgColor}
                  size={26} />
              </MenuOption>
          );
      })
      
  );
}

renderColorSelector() {
       
  let selectedColor = '#737373';
  if(defaultStyles[this.state.selectedColor])
  {
      selectedColor = defaultStyles[this.state.selectedColor].color;
  }
  

  return (
      <Menu renderer={SlideInMenu} onSelect={this.onColorSelectorClicked}>
      <MenuTrigger>
          <MaterialCommunityIcons name="format-color-text" color={selectedColor}
                  size={28} style={{
                      top:2
                  }} />             
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
          {this.renderColorMenuOptions()}
      </MenuOptions>
      </Menu>
  );
}

renderColorMenuOptions = () => {

  let lst = [];

  if(defaultStyles[this.state.selectedColor]) {
       lst = this.state.colors.filter(x => x !== this.state.selectedColor);
       lst.push('default');
      lst.push(this.state.selectedColor);
  }
  else {
      lst = this.state.colors.filter(x=> true);
      lst.push('default');
  }

  return (
      
      lst.map( (item) => {
          let color = defaultStyles[item] ? defaultStyles[item].color : 'black';
          return (
              <MenuOption value={item} key={item}>
                  <MaterialCommunityIcons name="format-color-text" color={color}
                  size={28} />
              </MenuOption>
          );
      })
      
  );
}

renderHighlight() {
  let selectedColor = '#737373';
  if(defaultStyles[this.state.selectedHighlight])
  { 
      selectedColor = defaultStyles[this.state.selectedHighlight].backgroundColor;
  }
  return (
      <Menu renderer={SlideInMenu} onSelect={this.onHighlightSelectorClicked}>
      <MenuTrigger>
          <MaterialCommunityIcons name="marker" color={selectedColor}
                  size={24} style={{                          
                  }} />             
      </MenuTrigger>
      <MenuOptions customStyles={highlightOptionsStyles}>
          {this.renderHighlightMenuOptions()}
      </MenuOptions>
      </Menu>
  );
}
  


  render() {
    return (
      <KeyboardAvoidingView 
      behavior="padding" 
      enabled
      keyboardVerticalOffset={0}
      style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor:'#eee',
          flexDirection: 'column', 
          justifyContent: 'flex-end', 
      }}
      >
     <ScrollView style={this.styles.containerEditNote}>
      <View style={this.styles.subContainer}>
      {this.state.isLoading &&
        <Spinner
        visible={this.state.isLoading}
        textContent={'Loading...'}
        // textStyle={styles.spinnerTextStyle}
        />}
        {this.state.referenceList.length == 0 
          ? 
          <Text style={this.styles.tapButton}>Tap button to add references</Text> 
          : 
          <FlowLayout style={this.styles.tapButton} ref="flow" 
            dataValue={this.state.referenceList} 
            openReference={(index) => {this.openReference(index)}} 
            deleteReference={(index) => {this.deleteReference(index)}}
            styles={this.styles}
          />
        }
        <Icon name="add-circle" style={this.styles.addIconCustom} size={28} color="gray" onPress={()=> {this.onAddVersePress()}} />
      </View>
      
      {/* <View style={this.styles.textEditorView}> */}
      <MenuProvider style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
      <View style={this.styles.textEditorView}>
      {/* <View style={this.styles.main}> */}
      <CNRichTextEditor       
          style={this.styles.richTextEditor}
          ref={(r)=>this.editor= r}            
          onSelectedTagChanged={this.onSelectedTagChanged}
          onSelectedStyleChanged={this.onSelectedStyleChanged}
          value={this.state.noteBody}
          styleList={defaultStyles}
          onValueChanged={this.onValueChanged}
      /> 
        <CNToolbar
          style={{
            height: 35,
          }}
          iconSetContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
          size={30}
          iconSet={[
            {
                type: 'tool',
                iconArray: [{
                    toolTypeText: 'bold',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-bold" />
                }, 
                {
                    toolTypeText: 'italic',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-italic" />
                },
                {
                    toolTypeText: 'underline',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-underline" />
                },
                {
                    toolTypeText: 'lineThrough',
                    buttonTypes: 'style',
                    iconComponent: <MaterialCommunityIcons name="format-strikethrough-variant" />
                }
            ]
            },
            {
                type: 'seperator'
            },
            {
                type: 'tool',
                iconArray: [
                    {
                        toolTypeText: 'body',
                        buttonTypes: 'tag',
                        iconComponent:
                        <MaterialCommunityIcons name="format-text" />
                    },
                    {
                        toolTypeText: 'title',
                        buttonTypes: 'tag',
                        iconComponent:
                        <MaterialCommunityIcons name="format-header-1" />
                    },
                    {
                        toolTypeText: 'heading',
                        buttonTypes: 'tag',
                        iconComponent:
                        <MaterialCommunityIcons name="format-header-3" />
                    },
                    {
                        toolTypeText: 'ul',
                        buttonTypes: 'tag',
                        iconComponent:
                        <MaterialCommunityIcons name="format-list-bulleted" />
                    },
                    {
                        toolTypeText: 'ol',
                        buttonTypes: 'tag',
                        iconComponent:
                        <MaterialCommunityIcons name="format-list-numbered" />
                    }
                ]
            },
            {
                type: 'seperator'
            },
            {
                type: 'tool',
                iconArray: [
                // {
                //     toolTypeText: 'image',
                //     iconComponent: this.renderImageSelector()
                // },
                {
                    toolTypeText: 'color',
                    iconComponent: this.renderColorSelector()
                },
                {
                    toolTypeText: 'highlight',
                    iconComponent: this.renderHighlight()
                }]
            },
            
        ]}
          selectedTag={this.state.selectedTag}
          selectedStyles={this.state.selectedStyles}
          onStyleKeyPress={this.onStyleKeyPress}
        /> 
        </View> 
        </TouchableWithoutFeedback>             
        {/* <RichTextEditor
          style={this.styles.richTextEditor}
          ref={(r)=>this.richtext = r}
          hiddenTitle={true}
          contentPlaceholder="New Note"
          initialContentHTML={this.state.noteBody}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />

        <RichTextToolbar
          ref={(r)=>this.toolbar = r}
          getEditor={() => this.richtext}
          renderAction={this._renderToolbarItem}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.setStrikethrough,
            actions.insertBulletsList,
            actions.insertOrderedList
          ]}
        /> */}
        </MenuProvider>
      {/* </View> */}
     </ScrollView> 
     </KeyboardAvoidingView>

    )
  }

  _renderToolbarItem (action,selected, method){
    let iconName = 'format-bold'
    switch(action) {
      case actions.setBold: {
        iconName = "format-bold"
        break
      }
      case actions.setItalic: {
        iconName = "format-italic"
        break
      }
      case actions.setUnderline: {
        iconName = "format-underlined"
        break
      }
      case actions.setStrikethrough: {
        iconName = "format-strikethrough"
        break
      }
      case actions.insertBulletsList: {
        iconName = "format-list-bulleted"
        break
      }
      case actions.insertOrderedList: {
        iconName = "format-list-numbered"
        break
      }
    }

    return(
      <Icon name={iconName} 
      size={28} 
      color={selected ? 'black' : 'white'} 
      style={[
        // this.styles.iconCustom,
        {backgroundColor: selected ? 'white': 'transparent', margin:8, 
        padding:8, }
      ]}
        onPress={method} 
      />
    );
  }
}

const mapStateToProps = state =>{
  return{
    language:state.updateVersion.language,
    versionCode:state.updateVersion.versionCode,
    sourceId:state.updateVersion.sourceId,


    chapterNumber:state.updateVersion.chapterNumber,
    totalChapters:state.updateVersion.totalChapters,
    totalVerses:state.updateVersion.totalVerses,
    bookId:state.updateVersion.bookId,
    downloaded:state.updateVersion.downloaded,
    // bookId:state.editNote.bookId,
    // bookName:state.editNote.bookName,
    // bodyText:state.editNote.bodyText,
    // chapterNumber:state.editNote.chapterNumber,
    // verseNumber: state.editNote.verseNumber,
    // index:state.editNote.index,
    
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
    
  }
}

var styles = StyleSheet.create({
  root: {
      flex: 1,
      paddingTop: 20,
      backgroundColor:'#eee',
      flexDirection: 'column', 
      justifyContent: 'flex-end', 
  },
  main: {
      flex: 1,
      marginTop: 10,
      paddingLeft: 30,
      paddingRight: 30,
      paddingBottom: 1,
      alignItems: 'stretch',
  },
  editor: { 
      backgroundColor : '#fff'
  },
  toolbarContainer: {
      minHeight: 35
  },
  menuOptionText: {
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5
  },
  divider: {
      marginVertical: 0,
      marginHorizontal: 0,
      borderBottomWidth: 1,
      borderColor: '#eee'
  }
});

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'yellow',
    padding: 0,   
    width: 40,
    marginLeft: width - 40 - 30,
    alignItems: 'flex-end',
  },
  optionsWrapper: {
    //width: 40,
    backgroundColor: 'white',
  },
  optionWrapper: {
     //backgroundColor: 'yellow',
    margin: 2,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  // optionText: {
  //   color: 'brown',
  // },
};

const highlightOptionsStyles = {
optionsContainer: {
  backgroundColor: 'transparent',
  padding: 0,   
  width: 40,
  marginLeft: width - 40,

  alignItems: 'flex-end',
},
optionsWrapper: {
  //width: 40,
  backgroundColor: 'white',
},
optionWrapper: {
  //backgroundColor: 'yellow',
  margin: 2,
},
optionTouchable: {
  underlayColor: 'gold',
  activeOpacity: 70,
},
// optionText: {
//   color: 'brown',
// },
};


export  default connect(mapStateToProps,null)(EditNote)
