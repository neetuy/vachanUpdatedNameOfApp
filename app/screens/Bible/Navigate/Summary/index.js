// import React from 'react';

// import {
//   StyleSheet,
//   View,
//   Dimensions,
//   ScrollView,
//   Text
// } from 'react-native';
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
// import {Segment,Button} from 'native-base'

// import {parseFile} from '../../utils/TextParser'
// const activeTabFlag = {
//     BOOK: 0,
//     CHAPTER: 1,
//     VERSE: 2
//   };
// export default class Summary extends React.Component {
//   static navigationOptions = {
//     headerTitle: 'Summary',
//   };
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentVisibleChapter:this.props.screenProps.currentVisibleChapter,
//       bookId:this.props.screenProps.bookId,
//       activeTab :activeTabFlag.BOOK,
//       summaryOfBook:[],
//     }
//     this.toggleButton = this.toggleButton.bind(this)
//   }
//   componentDidMount(){
//      parseFile(this.state.bookId,null).then((value)=>{
       
//         console.log("VALUE TEST "+value+"BOOK ID FROM SUMMARY PAGE "+this.state.bookId)
//         this.setState({summaryOfBook:value})
//       })
//   }
//   toggleButton(activeTab){
//     if (this.state.activeTab == activeTab) {
//       return;
//     }
//     this.setState({summaryOfBook: []}, () => {
//       switch (activeTab) {
//         case activeTabFlag.BOOK: {
//           parseFile(this.state.bookId,null).then((value)=>{
//             console.log("value "+JSON.stringify(value))
//             console.log("value "+value+"BOOK ID FROM SUMMARY PAGE SWITCH CASE "+this.state.bookId)

//             this.setState({summaryOfBook:[...this.state.summaryOfBook, ...value]})
//           })
//           break;
//         }
//         case activeTabFlag.CHAPTER: {
//           parseFile(this.state.bookId,this.state.currentVisibleChapter).then((value)=>{
//             console.log("value "+JSON.stringify(value))
//             console.log("value "+value+"BOOK ID FROM SUMMARY PAGE SWITCH CASE chapter"+this.state.bookId)

//             this.setState({summaryOfBook:[...this.state.summaryOfBook, ...value]})
//           })
//           break;
//         }
//         case activeTabFlag.VERSE: {
//           break;
//         }
//       }
//     })
//     this.setState({activeTab})

//   }
//   render() {
//     console.log("summary data "+JSON.stringify(this.state.summaryOfBook))
//     return (
//       <View>
//         <Segment>
//               <Button 
//                 style={[
//                     {backgroundColor:this.state.activeTab === activeTabFlag.BOOK ?  "#3F51B5":"#fff"},
//                 ]} 
//                 onPress={() =>this.toggleButton(activeTabFlag.BOOK)} 
//                 active={this.state.activeTab == activeTabFlag.BOOK ? true : false} 
//                 first
//               ><Text style={{paddingHorizontal:16}}>Book</Text></Button>
//               <Button 
//                  style={[
//                     {backgroundColor:this.state.activeTab === activeTabFlag.CHAPTER ?  "#3F51B5":"#fff"},
//                 ]} 
//                 onPress={() =>this.toggleButton(activeTabFlag.CHAPTER)} 
//                 active={this.state.activeTab == activeTabFlag.CHAPTER ? true : false} 
//               ><Text style={{paddingHorizontal:16}}>Chapter</Text></Button>
//               <Button
//                     style={[
//                         {backgroundColor:this.state.activeTab === activeTabFlag.VERSE ?  "#3F51B5":"#fff"},
//                     ]} 
//                     onPress={() =>this.toggleButton(activeTabFlag.VERSE)} 
//                     active={this.state.activeTab == activeTabFlag.VERSE ? true : false} 
//                     last ><Text style={{paddingHorizontal:16}}>Verse</Text></Button>
//         </Segment>
//         {
//           this.state.summaryOfBook ? 
//           <ScrollView>
//             {this.state.summaryOfBook.map((item)=>
//               <Text>{item.key} {item.value}</Text>
//             )}
//             <View style={{height:65, marginBottom:4}} />
//           </ScrollView> : <Text>loading</Text> 
//         }
        
//     </View>
//     )
//   }

// }
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
// import DbQueries from '../../../../utils/dbQueries'

export default class Summary extends Component {
  static navigationOptions = {
    headerTitle: 'Summary',
    headerRight:(
      <View style={{flexDirection:"row",justifyContent:"flex-end"}}>
      <TextInput
      // placeholder="Search"
      underlineColorAndroid = '#fff'
      placeholderTextColor={'#fff'} 
      returnKeyType="search"
      multiline={false}
      numberOfLines={1}
      style={{width:Dimensions.get('window').width/4}}
     
    />
      <Icon name='search' color="#fff" size={28} style={{marginHorizontal:8}} />
    </View>
    )
  };

  render() {
    return (
      <View>
       <Text>Summary</Text>
      </View>
    );
  }
}
