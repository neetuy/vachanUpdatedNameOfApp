import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles =(colorFile, sizeFile) =>{
    // console.log("color file ",colorFile,sizeFile)
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
        
    },
    verseWrapperText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
        justifyContent:'center',
    },
    chapterList:{
        margin:16
    },
    footerComponent:{
        height:64,
        marginBottom:4
    },
    bottomBar:{
        position:'absolute', 
        bottom:0,
        width: width, 
        height: 62, 
        backgroundColor:'#3F51B5',
        flexDirection:'row',
        justifyContent:'center'

    },
    bottomOption:{
        flexDirection:'row',
        width:width/3,
        justifyContent:'center',
        alignItems:'center',
       
    },
    playButton: {
        height: 72,
        width: 72,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 72 / 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
     
    bottomOptionText:{
        textAlign:'center',
        color:'white',   
        fontSize:sizeFile.bottomBarText 

    },
    bottomOptionIcon:{
        alignSelf:'center',
        fontSize:sizeFile.iconSize 
    },
    bottomOptionSeparator:{
        width: 1,
        backgroundColor:'white',
        marginVertical:8,
        
    },
    VerseText:{
        // fontFamily:fontfamily, 
        fontWeight:'100'
    },
    bottomBarParallelPrevView:{
        position:'absolute', 
        backgroundColor:colorFile.semiTransparentBackground,
        justifyContent:'center',
        height:40,
        width:40,
        borderRadius: 28,
        bottom:48,
        left:8
    },
    bottomBarPrevView:{
        height:56,
        width:56,
        borderRadius:32,
        margin:8,
        bottom:20,
        left:0,
        position:'absolute', 
        backgroundColor:colorFile.semiTransparentBackground,
        justifyContent:'center'
    },
    bottomBarNextParallelView:{
        position:'absolute', 
        backgroundColor:colorFile.semiTransparentBackground,
        justifyContent:'center',
        height:40,
        width:40,
        borderRadius: 28,
        bottom:48,
        right:8
    },

    bottomBarNextView:{
        height:56,
        width:56,
        borderRadius:32,
        margin:8,
        bottom:20,
        right:0,
        position:'absolute', 
        backgroundColor:colorFile.semiTransparentBackground,
        justifyContent:'center'
    },
    bottomBarAudioCenter:{
        borderRadius: 32, 
        margin:8, 
        position:'absolute', 
        bottom:20, 
        // left:0,
        // width: 56, 
        // height: 56, 
        // backgroundColor: colorFile.backgroundColor,
        backgroundColor:colorFile.semiTransparentBackground,
        // backgroundColor:'rgba(63, 81, 181,0.5)',
        justifyContent:'center'
    },
    bottomBarChevrontIcon:{ 
        alignItems:'center',
        zIndex:2, 
        alignSelf:'center',
        color:colorFile.chevronIconColor,
        fontSize: sizeFile.chevronIconSize
    },
    verseNumber:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    verseChapterNumber:{
        fontSize:sizeFile.titleText,
        
        //fontFamily:fontfamily,fontSize:22,
    },
    verseTextSelectedHighlighted:{
        backgroundColor:colorFile.highlightColor,
        textDecorationLine: 'underline',
    },
    verseTextNotSelectedNotHighlighted:{
        
    },
    verseTextNotSelectedHighlighted:{
        backgroundColor:colorFile.highlightColor,
    },
    verseTextSelectedNotHighlighted:{
        textDecorationLine: 'underline',
    },
    textStyle:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText,
    },
    addToSharefooterComponent:{
        height: 40, 
        marginBottom: 40 
    },
    IconFloatingStyle:{
        position: 'absolute',
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        padding:8,
        top: 10,
      },
    })
}
