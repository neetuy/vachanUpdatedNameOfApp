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
    commentaryHeading:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
        fontWeight:'bold'
    },
    verseWrapperText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
        justifyContent:'center',
        
    },
    cardItemBackground:{
        backgroundColor:colorFile.backgroundColor,
        paddingVertical:10
    },
    commentaryText:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor,
    },
    chapterList:{
        margin:16
    },
    footerComponent:{
        height:64,
        marginBottom:4
    },

    VerseText:{
        // fontFamily:fontfamily, 
        fontWeight:'100'
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
