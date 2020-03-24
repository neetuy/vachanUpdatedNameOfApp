import React,{Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
  Text,
  Alert,
  View
} from 'react-native';
var RNFS = require('react-native-fs');
import SplashScreen from 'react-native-splash-screen'
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux'
import {Accordion,Card,CardItem,Content,Body,Header,Container, Right,Left,Title,Button} from 'native-base'
import{fetchDictionaryContent} from '../../../store/action/index'
import {getBookNameFromMapping} from '../../../utils/UtilFunctions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import startEndIndex from '../../../assets/commentary_mapping'
import { NavigationEvents } from 'react-navigation';
import APIFetch from '../../../utils/APIFetch'
import {styles} from './styles'

class Dictionary extends Component {

    constructor(props){
      super(props)

        this.state = {
          modalVisibleDictionary:false,
          wordDescription:[],
        }
        this.styles = styles(this.props.colorFile, this.props.sizeFile)
        this.alertPresent =false

    }
  componentDidMount(){
    this.props.fetchDictionaryContent({parallelContentSourceId:this.props.parallelContentSourceId})
  }
  // componentDidUpdate(nextProps) {
  //   this.props.fetchDictionaryContent({parallelContentSourceId:nextProps.parallelContentSourceId})
  // }
  // componentWillMount(){
  //   this.props.fetchDictionaryContent({parallelContentSourceId:this.props.parallelContentSourceId})

  // }
  fetchWord=async(word)=>{
    try{
      var wordDescription = await APIFetch.fetchWord(this.props.parallelContentSourceId,word.wordId)
      this.setState({
        wordDescription:wordDescription.meaning,
        modalVisibleDictionary:true
      })
    }
    catch(error){
      this.setState({
        wordDescription:[],
        modalVisibleDictionary:false
      })
    }

  }
    _renderHeader = (item, expanded) =>{
        return(
          <View style={this.styles.headerStyle}>
            <Text style={this.styles.headerText} >
            {" "}{item.letter}
            </Text>
            <Icon style={this.styles.iconStyle} name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-up" }  size={24}/>

          </View>
        )
    }
    _renderContent = (item) =>{
      return(
        item.words.map(w=>
        <TouchableOpacity 
          style={{
            // flexDirection: "row",
            padding: 10,
            }}
            onPress={()=>this.fetchWord(w)}
          >
            <Text style={this.styles.textDescription}>{w.word}</Text>
          </TouchableOpacity>
      )
      )
    }

    errorMessage(){
      if (!this.alertPresent) {
          this.alertPresent = true;
          if (this.props.dictionaryContent.length === 0) {
              Alert.alert("", "Check your internet connection", [{text: 'OK', onPress: () => { this.alertPresent = false } }], { cancelable: false });
              this.props.fetchDictionaryContent({parallelContentSourceId:this.props.parallelContentSourceId})
            } else {
              this.alertPresent = false;
          }
      }
    }
    updateData = ()=>{
      // if(this.props.error){
        this.errorMessage()
      // }
      // else{
      //   return
      // }
    }
    

  render(){
    console.log(" this.props.data ", this.props.dictionaryContent)
    console.log(" this.props.error ", this.props.error)

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
        {this.state.isLoading &&
        <Spinner
        visible={true}
        textContent={'Loading...'}
        //  textStyle={styles.spinnerTextStyle}
      />}
      {
        (this.props.error) ? 
        <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
          <TouchableOpacity 
          onPress={()=>this.updateData()}
          style={{height:40,width:120,borderRadius:4,backgroundColor:'#3F51B5',
          justifyContent:'center',alignItems:'center'
        }}
          >
            <Text style={{fontSize:18,color:'#fff'}}>Reload</Text>
          </TouchableOpacity>
        </View> 
      // }
      :
        <View>
        <Accordion 
        dataArray={this.props.dictionaryContent}
        animation={true}
        expanded={true}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
       <Modal
         animated={true}
         transparent={true}
         visible={this.state.modalVisibleDictionary}>
         <TouchableWithoutFeedback
           style={this.styles.dictionaryModal} 
           onPressOut={()=>this.setState({modalVisibleDictionary:false})} 
           >
         <View style={this.styles.dictionaryModalView}>
          <View style={{width:'70%'}}>
          <Icon name='cancel' size={28} color={'#ff'} style={{position:'absolute',top:-20,right:-20}}/>
           <Card>
             <CardItem><Text >Description: {this.state.wordDescription.definition}</Text></CardItem>
             <CardItem><Text >Keywrod: {this.state.wordDescription.keyword}</Text></CardItem>
             {this.state.wordDescription.seeAlso !='' && <CardItem><Text >See Also: {this.state.wordDescription.seeAlso}</Text></CardItem>}
           </Card>
         </View>
         </View>
         </TouchableWithoutFeedback>
       </Modal>
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
    dictionaryContent:state.dictionaryFetch.dictionaryContent,
    error:state.dictionaryFetch.error,
    parallelContentLanguageCode:state.updateVersion.parallelContentLanguageCode
  }

}
const mapDispatchToProps = dispatch =>{
  return {
    fetchDictionaryContent:(payload)=>dispatch(fetchDictionaryContent(payload)),
    fetchWordId:(payload)=>dispatch(fetchWordId(payload)),
  }
}
export  default connect(mapStateToProps,mapDispatchToProps)(Dictionary)