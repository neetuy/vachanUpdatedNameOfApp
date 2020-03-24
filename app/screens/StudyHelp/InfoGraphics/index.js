
import React,{Component} from 'react';
import { StyleSheet,Image,ScrollView, FlatList,TouchableOpacity, Text, View, Alert, Platform } from 'react-native';


import {connect} from 'react-redux'
import {selectedChapter,updateAudio,updateContentType} from '../../../store/action/'
import APIFetch from '../../../utils/APIFetch'
import { NavigationEvents } from 'react-navigation';


import infographics from '../../../assets/infographics.json'
import Icon from 'react-native-vector-icons/MaterialIcons'


class Infographics extends Component {

  static navigationOptions = ({navigation}) =>{
    const { params={} } = navigation.state 
    console.log("params header of infographics ",params)
    return{
      // headerStyle :{justifyContent: 'center'},
      // headerTitleStyle :{textAlign: 'center'},
        headerTitle:(
            <View style={{flex:1,marginRight:10}}>
              <TouchableOpacity style={styles.touchableStyleLeft}  
              // onPress={() =>{navigation.navigate("LanguageList", {contentType:'infographics'})}}
              >
                <Text  style={styles.headerTextStyle}>{params.file} </Text>
              <Icon name="arrow-drop-down" color="#fff" size={24}/>
              </TouchableOpacity>
            </View>
      ), 
        headerTintColor:"#fff",
    }
}
    constructor(props){
      super(props)
      this.state = {
      GridViewItems: [],
      OrientationStatus : '',
      Height_Layout : '',
      Width_Layout : ''
    }
    }
   getImage =()=>{
    this.props.navigation.setParams({ file:this.props.file})
   }
    componentDidMount(){
      console.log("IMAGE PATH ",this.props.file)
      this.props.navigation.setParams({
        bookName:this.props.bookName,
        currentChapter: this.props.chapterNumber,
        languageName:this.props.language,
        versionCode:this.props.version,
        updateContentType:this.props.updateContentType('Infographics'),
        file:this.props.file
        // callBackForUpdateBook:this.getImage
      })
      this.DetectOrientation();
    }
    DetectOrientation(){
      if(this.state.Width_Layout > this.state.Height_Layout)
      {
        console.log("ORIENTATION ",this.state.Width_Layout )
        console.log("ORIENTATION ",this.state.Height_Layout )
          this.setState({
          OrientationStatus : 'Landscape Mode'
          })
      }
      else{
        console.log("ORIENTATION ",this.state.Width_Layout )
        console.log("ORIENTATION ",this.state.Height_Layout )
          this.setState({
          OrientationStatus : 'Portrait Mode'
          })
      }
    }
 
  render(){
      console.log("infographics json file ",this.props.file)
   return(
     <View style={{flex:1}} 
     onLayout={(event) => this.setState({
      Width_Layout : event.nativeEvent.layout.width,
      Height_Layout : event.nativeEvent.layout.height
     }, ()=> this.DetectOrientation())}> 
      <NavigationEvents
      onWillFocus={() => this.props.navigation.setParams({ file:this.props.file})}
      />
    {/* <ScrollView horizontal={true}> */}
    {/* <ScrollView> */}
    <Text style={styles.TextStyle}> { this.state.OrientationStatus } </Text>
       <Image  style={{height:"98%",width:'98%'}} source={{ uri: this.props.filePath }} />
       {/* </ScrollView> */}
       {/* </ScrollView> */}

     </View>
   )
  }
 
}

const styles = StyleSheet.create({
  MainContainer :{
  // justifyContent: 'center',
  flex:1,
  // margin: 8,
  // paddingTop: (Platform.OS) === 'ios' ? 20 : 0
   
  }, 
  GridViewBlockStyle: {
    justifyContent: 'center',
    flex:1,
    alignItems: 'center',
    height: 220,
    margin: 5,
    backgroundColor: '#00BCD4'
   
  },
  GridViewInsideTextItemStyle: {
     color: '#fff',
     padding: 4,
     fontSize: 18,
     justifyContent: 'center',  
   },
   headerLeftStyle:{
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
  });
const mapStateToProps = state =>{
  return{
    language: state.updateVersion.language,
    contentType:state.updateVersion.contentType,

    chapterNumber:state.updateVersion.chapterNumber,
    totalChapters:state.updateVersion.totalChapters,
    bookName:state.updateVersion.bookName,
    bookId:state.updateVersion.bookId,
    fontFamily:state.updateStyling.fontFamily,

    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
    close:state.updateSplitScreen.close,

    filePath:state.infographics.url,
    file:state.infographics.fileName

  }
}

const mapDispatchToProps = dispatch =>{
  return {
    selectedChapter: (chapterNumber,totalVerses)=>dispatch(selectedChapter(chapterNumber,totalVerses)),
    closeSplitScreen :(close)=>dispatch(closeSplitScreen(close)),
    updateAudio :(audio)=>dispatch(updateAudio(audio)),
    updateContentType:(content) =>dispatch(updateContentType(content)),
  }
}
export  default connect(mapStateToProps,mapDispatchToProps)(Infographics)
