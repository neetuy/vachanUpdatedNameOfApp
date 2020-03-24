import {ADD_BOOK_TO_NOTE,ADD_CHAPTER_TO_NOTE,ADD_VERSE_TO_NOTE,UPDATE_NOTE_BODY} from '../action/actionsType';

const initialState = {
    bookId: '3jn',
    bookName: '3 John',
    chapterNumber:1,
    totalChapters:1,
    verseNumber: 1,
    totalVerses:15,
    verseText:'',
    bookName:'3 यूहन्ना',
}

function editNoteReducer(state=initialState,action){
    switch(action.type) {
        case ADD_BOOK_TO_NOTE:
        return {
            ...state,
            bookId:action.bookId,
            bookName:action.bookName,
            totalChapters:action.totalChapters,
        }
        case ADD_CHAPTER_TO_NOTE:
        return {
            ...state,
            chapterNumber:action.chapterNumber,
            totalVerses:action.totalVerses,
        }
        case ADD_VERSE_TO_NOTE:
        return {
            ...state,
            verseNumber:action.verseNumber,
            verseText:action.verseText,
        }
        case UPDATE_NOTE_BODY:
        return {
            ...state,
            bodyText:action.bodyText,
        }
       
        default: 
        return state
    }
}

export default editNoteReducer