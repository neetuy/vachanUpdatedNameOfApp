import { UPDATE_VERSION,UPDATE_VERSION_BOOK, UPDATE_CONTENT_TYPE  } from '../action/actionsType';

const initialState = {
   language:'Hindi',
   languageCode:'hin',
   version:'Indian Revised Bible',
   versionCode:'IRV',
   sourceId:45,
   downloaded:false,
   bookId:'3jn',
   bookName:'3 यूहन्ना',
   chapterNumber:1,
   totalChapters:1,
   verseNumber: 1,
   totalVerses:15,
   verseText:'',
   parallelContentType:'bible',
   parallelContentLanguage:'Hindi',
   parallelContentLanguageCode:'hin',
   parallelContentVersion:'Indian Revised Version',
   parallelContentVersionCode:'IRV',
   parallelContentDownloaded:false
}

function updateVersionReducer(state=initialState,action){
    switch(action.type) {
        case UPDATE_VERSION:
        return {
            ...state,
        language:action.payload.language,
        languageCode:action.payload.languageCode,
        versionCode:action.payload.versionCode,
        sourceId:action.payload.sourceId,
        downloaded:action.payload.downloaded,
       
        }
        case UPDATE_VERSION_BOOK:
        return {
            ...state,
            bookId:action.payload.bookId,
            bookName:action.payload.bookName,
            chapterNumber:action.payload.chapterNumber,
            totalChapters:action.payload.totalChapters,
            totalVerses:action.payload.totalVerses,
            verseNumber:action.payload.verseNumber
        }
        case UPDATE_CONTENT_TYPE:
        return {
            ...state,
            parallelContentType:action.payload.parallelContentType,
            parallelContentLanguage:action.payload.parallelContentLanguage,
            parallelContentLanguageCode:action.payload.parallelContentLanguageCode,
            parallelContentVersion:action.payload.parallelContentVersion,
            parallelContentVersionCode:action.payload.parallelContentVersionCode,
            parallelContentSourceId:action.payload.parallelContentSourceId,
            parallelContentDownloaded:false
        }
        default: 
        return state
    }
}

export default updateVersionReducer