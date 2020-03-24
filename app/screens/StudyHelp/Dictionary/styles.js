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
        iconStyle:{
            fontSize:28,
            color:colorFile.textColor,
            fontSize:sizeFile.contentText
        },
        headerText:{
            fontWeight: "600" ,
            color:colorFile.textColor,
            fontSize:sizeFile.contentText
        },
        headerStyle:{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            color:colorFile.textColor,
            fontSize:sizeFile.contentText
        },
        dictionaryModal:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:colorFile.backgroundColor
        },
        dictionaryModalView:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:colorFile.backgroundColor

        },
        cardStyle:{
            backgroundColor:colorFile.backgroundColor
        },
        textStyle:{
            color:colorFile.textColor,
            fontSize:sizeFile.contentText,
        },
        textDescription:{
            color:colorFile.textColor,
            fontSize:sizeFile.contentText,
        }
    })
}
