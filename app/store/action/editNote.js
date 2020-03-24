import {ADD_BOOK_TO_NOTE,ADD_CHAPTER_TO_NOTE,ADD_VERSE_TO_NOTE,UPDATE_NOTE_VERSE,UPDATE_NOTE_BODY} from './actionsType.js'

export const addBookToNote = (bookId,bookName,totalChapters)=>{
    return {
        type:ADD_BOOK_TO_NOTE,
        bookId:bookId,
        bookName:bookName,
        totalChapters:totalChapters,
    }
}
export const addChapterToNote = (chapterNumber,totalVerses)=>{
    return {
        type:ADD_CHAPTER_TO_NOTE,
        chapterNumber:chapterNumber,
        totalVerses:totalVerses,
    }
}

export const addVerseToNote = (verseNumber,verseText)=>{
    return {
        type:ADD_VERSE_TO_NOTE,
        verseNumber:verseNumber,
        verseText:verseText,
    }
}

export const updateNoteBody = (bodyText)=>{
    return {
        type:UPDATE_NOTE_BODY,
        bodyText:bodyText,
    }
}

