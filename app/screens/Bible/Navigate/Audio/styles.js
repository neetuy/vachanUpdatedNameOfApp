import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const styles =(colorFile, sizeFile) =>{
    // console.log("color file ",colorFile,sizeFile)
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor:'#3F51B5'
            // paddingTop: 8,
          },
          playButton: {
            height:56,
            width: 56,
            // borderWidth: 1,
            // borderColor: '#fff',
            // borderRadius: 32,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          },
          
          secondaryControl: {
            // height: 18,
            // width: 18,
          },
          off: {
            opacity: 0.30,
          },
    // container:{
    //     flex:1,
    //     backgroundColor:colorFile.backgroundColor
        
    // },
    iconStyle:{
        color:colorFile.chevronIconColor,
        fontSize: sizeFile.chevronIconSize
    }
  
})
}
