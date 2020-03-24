// import { FETCH_BIBLE,FETCH_BIBLE_FAILURE, FETCH_BIBLE_SUCCESS } from './actionsType';
// import ApiUtils from '../../utils/ApiUtils'
// const API_BASE_URL = 'https://api.autographamt.com/v1/'
// import { takeLatest, put, call } from 'redux-saga/effects';

//   export function* watchFetchPost() {
//         yield* takeLatest(FETCH_BIBLE, onFetchBible);
//     }
//     function* onFetchBible(sourceId,type,bookId,chapterNum) {
//     try {
//       // This will do the trick for you.
//       const [ languages, availableBooks, bibleContent ] = yield [
//         call(API_BASE_URL+"languages"),
//         call(API_BASE_URL + "bibles" + "/" + sourceId + "/" + "books"),
//         call(API_BASE_URL + "bibles" + "/" + sourceId + "/" + "books" + "/" + bookId + "/" + "chapter" + "/" + chapterNum),
//       ]
  
//       // Instead of dispatching three different actions, heres just one!
//       yield put(fetchBibleSuccess(languages, availableBooks, bibleContent))
//     } catch(error) {
//       yield put(fetchBibleFailure(error))
//     }
//     }
//     function fetchBibleSuccess(languageList, bookList, content) {
//     return {
//       type: FETCH_BIBLE_SUCCESS,
//         languageList:languageList,
//         bookList:bookList,
//         content:content
//     };
//     }
//     function fetchBibleFailure(error) {
//     console.log("response error ",error)
//     return {
//         type: FETCH_BIBLE_FAILURE
//     }
//     }