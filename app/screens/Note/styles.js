import {StyleSheet,Dimensions} from 'react-native'
import { Icon } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const noteStyle =(colorFile, sizeFile) =>{
    return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    noteCardItem:{
        justifyContent:'space-between', 
        alignItems:'center',
        marginTop:16, 
        flexDirection:'row'
        
    },
    cardItemStyle:{
        paddingTop:16,
        paddingBottom:16,
        backgroundColor:colorFile.backgroundColor
     },
    notesContentView:{
        flex:1,
        backgroundColor:colorFile.backgroundColor
    },
    noteContent:{
        flex:1,
        backgroundColor:colorFile.backgroundColor,
    },
    centerEmptySet: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
    },
    noteFontCustom:{
        fontSize:sizeFile.contentText,
        color:colorFile.textColor
    },
    deleteIon:{
        fontSize:sizeFile.iconSize,
        color:colorFile.textColor
    },
    noteFlatlistCustom:{
        backgroundColor:colorFile.backgroundColor,
        margin:8
    },



    main: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    toolbarButton: {
        fontSize: 20,
        width: 28,
        height: 28,
        textAlign: 'center'
    },
    italicButton: {
        fontStyle: 'italic'
    },
    boldButton: {
        fontWeight: 'bold'
    },
    underlineButton: {
        textDecorationLine: 'underline'
    },
    lineThroughButton: {
        textDecorationLine: 'line-through'
    },

    
    //editNote


    NoteAddButton:{
        flex:8
    },
    noteTextSize:{
    fontSize:sizeFile.contentText,      
    },
    FlowLayoutCustom:{
        flex:8
    },
    addIconCustom:{
    flex:1,
    fontSize:sizeFile.iconSize,
    color:colorFile.iconColor
    },
    noteTextView:
    {height:2, 
    backgroundColor:'gray', 
    marginHorizontal:8
    },
    containerEditNote:{
        flex:1, 
        flexDirection:'column', 
        backgroundColor:colorFile.backgroundColor

    },
    subContainer:{
        justifyContent:'space-between',
        flexDirection:'row',
         alignItems:'center',
        marginHorizontal:8,
        marginVertical:16
    },
    noteReferenceViewCustom:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        margin:8
    },
    tapButton:{
        flex:8,
        color:colorFile.textColor,
        fontSize:sizeFile.titleText
    },
    emptyMessageContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    messageEmpty:{
        fontSize:sizeFile.titleText,
        color:colorFile.textColor,
        // textAlign:'center',
    },
    emptyMessageIcon:{
        fontSize:sizeFile.emptyIconSize,
        margin:16,
        color:colorFile.iconColor,
    },
    textEditorView:{
        flexDirection: 'column-reverse'
    },
    richTextEditor:{
        height:height,
        color:colorFile.textColor,
        fontSize:sizeFile.contentText,
        backgroundColor:colorFile.backgroundColor
    },
    iconCustom:{
        margin:8, 
        padding:8, 
    },
    textStyle:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    },
    iconReferClose:{
        color:colorFile.textColor,
        fontSize:sizeFile.contentText
    }

})
}

