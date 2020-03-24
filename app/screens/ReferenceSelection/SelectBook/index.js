import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Segment,Button,Tab,Tabs, Item} from 'native-base'
import { SelectBookPageStyle } from './styles.js';
import {AsyncStorageConstants} from '../../../utils/AsyncStorageConstants'
import {connect} from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class SelectBook extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab:true,
      NTSize:0,
      OTSize:0,
      isLoading:false
    }
    this.styles = SelectBookPageStyle(this.props.colorFile, this.props.sizeFile);
    this.navigateTo = this.navigateTo.bind(this)
    this.viewabilityConfig = {
        itemVisiblePercentThreshold: 100,
        waitForInteraction: true
    }
  }
  toggleButton(value){
    this.setState({activeTab:value})
    if(value == false){
      this.flatlistRef.scrollToIndex({index:this.state.OTSize,viewPosition:0,animated: false,viewOffset:0})
    }
    else{
      this.flatlistRef.scrollToIndex({index:0,viewPosition:0,animated: false,viewOffset:0})
    }
  }

  getItemLayout = (data, index) => (
    { length: 48, offset: 48 * index, index }
  )
  navigateTo(item){
    this.props.screenProps.updateSelectedBook(item)
    this.props.navigation.navigate('Chapters')
  } 

  getOTSize=()=>{
    var count = 0;
    if(this.props.books.length == 0){
      this.setState({OTSize:0})
    }else{
      for(var i=0 ; i<this.props.books.length ; i++){
        if(this.props.books[i].bookNumber <= 39){
          count ++;
        }
        else{
          break;
        }
      }
  }
  this.setState({OTSize:count})
  }

getNTSize=()=>{
  var count = 0;
  if(this.props.books.length == 0 ){
    this.setState({NTSize:0})
  }else{
    for(var i=this.props.books.length-1 ; i>=0 ; i--){
      if(this.props.books[i].bookNumber >= 40){
        count++
      }
      else{
        break;
      }
    }
  }
  this.setState({NTSize:count})
}
// componentWillReceiveProps(nextProps){

// }
// componentWillMount(){
//   this.getOTSize()
//   this.getNTSize()
// }
componentDidMount(){
  this.getOTSize()
  this.getNTSize()
}
componentDidUpdate(prevProps,prevState){
  if(prevProps.books !== this.props.books ){
    console.log("update books list ")
    this.getOTSize()
    this.getNTSize()
  }
}
renderItem = ({item, index})=> {
    return (
      <TouchableOpacity 
          onPress={()=>this.navigateTo(item)}>
          <View 
            style={this.styles.bookList}>
            <Text
              style={
                [this.styles.textStyle,
                  {fontWeight:item.bookId == this.props.screenProps.selectedBookId ? "bold" : "normal"}
                ]
              }
              >
              {item.bookName}
            </Text>
            <Icon 
              name='chevron-right' 
              color="gray" 
              style={this.styles.iconCustom}
              />
          </View>
        </TouchableOpacity>
    );
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      if (viewableItems.length > 0) {
        if (viewableItems[0].index < this.state.OTSize) {
          // toggel to OT
          this.setState({activeTab:true})
        } else {
          // toggle to NT
          this.setState({activeTab:false})
        }
      }
  }


  render(){
    console.log("BOOK LIST ",this.props.books)
    let activeBgColor = this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#3F51B5' : '#fff'
    let inactiveBgColor =  this.state.colorMode == AsyncStorageConstants.Values.DayMode ? '#fff' : '#3F51B5'
    return (
      <View style={this.styles.container}>
      {this.props.isLoading ? 
         <Spinner
         visible={true}
         textContent={'Loading...'}
        //  textStyle={styles.spinnerTextStyle}
          />
        :
        <View style={this.styles.bookNameContainer}>
        <Segment>
              {
                this.state.OTSize > 0 
              ?
              <Button 
                active={this.state.activeTab} 
                style={[{
                  backgroundColor: this.state.activeTab ? activeBgColor : inactiveBgColor,
                  width: this.state.NTSize == 0 ? width : width*1/2,
                  },this.styles.segmentButton]} 
                onPress={this.toggleButton.bind(this,true)
                }
              >
                <Text 
                  style={{color:this.state.activeTab ? inactiveBgColor : activeBgColor
                  }}>
                  Old Testament
                </Text>
              </Button>
              : null}
              {
                this.state.NTSize > 0 

              ?
              <Button 
                active={!this.state.activeTab} 
                style={[{
                  backgroundColor: !this.state.activeTab ? activeBgColor : inactiveBgColor,
                  width: this.state.OTSize == 0 ? width : width*1/2,                  
                },this.styles.segmentButton]} 
                onPress={this.toggleButton.bind(this,false)}>
                <Text 
                  active={!this.state.activeTab} 
                  style={[
                    {
                      color:!this.state.activeTab ? inactiveBgColor : activeBgColor
                    },this.styles.buttonText]
                  }>
                  New Testament
                </Text>
              </Button>
              :null}
            </Segment>
            <FlatList
              ref={ref => this.flatlistRef = ref}
              data={this.props.books}
              getItemLayout={this.getItemLayout}
              onScroll={this.handleScroll}
              renderItem={this.renderItem}
              extraData={this.styles}
              keyExtractor={item => item.bookNumber}
              onViewableItemsChanged={this.onViewableItemsChanged}
              viewabilityConfig={this.viewabilityConfig}
            />
        </View> 
      }
      </View>
    );
  }

}
const mapStateToProps = state =>{
  return{
    books:state.versionFetch.data,
    isLoading:state.versionFetch.isLoading,
    sizeFile:state.updateStyling.sizeFile,
    colorFile:state.updateStyling.colorFile,
  }
}
 export default connect(mapStateToProps,null)(SelectBook)