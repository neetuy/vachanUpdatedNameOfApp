import {StyleSheet,Dimensions} from 'react-native'
import colorConstants from '../../../utils/colorConstants'

export const SelectBookPageStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:colorFile.backgroundColor,
  
    // flexDirection:'row'
   },
    textStyle: {
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        justifyContent:'center'
   },
   headerRightText:{
    color:"#fff",
    margin:16
   },
    sideBarContainer:{
        flexDirection:'column',
        // width:width/5,
        backgroundColor:colorConstants.Black
    },
    sideBarIconCustom:{
        alignSelf:'center',
        padding:16,
        color:colorConstants.White
    },
    bookNameContainer:{
        flexDirection:'column',
        
    },
  
    segmentButton:{
        padding:4,
        height: 45,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderColor:'#3F51B5',
        justifyContent:'center'
    },
    buttonText:{
        alignItems:'center'
    },
    bookList:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        paddingHorizontal:16, 
        height:48
      },
    iconCustom:{
        color:colorFile.iconColor,
        fontSize:sizeFile.iconSize
    },
   cardItemStyle:{paddingTop:16,paddingBottom:16},
})
}

