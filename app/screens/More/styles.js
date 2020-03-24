import {StyleSheet,Dimensions} from 'react-native'

export const styles =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    textStyle: {
        color: colorFile.textColor,   
        // fontSize:16,
        fontSize:sizeFile.contentText,

        // marginLeft:4,
},

cardItemStyle:{
   backgroundColor:colorFile.backgroundColor
},

cardItemIconCustom:{
    color:colorFile.iconColor,
    fontSize:sizeFile.iconSize,

    // fontSize:32   
},

})
}
