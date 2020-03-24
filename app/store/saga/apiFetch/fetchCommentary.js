  import { FETCH_COMMENTARY_CONTENT } from '../../action/actionsType'
  import {commentaryContentSuccess,commentaryContentFailure}  from '../../action/'
  import { put, takeLatest, call,fork } from 'redux-saga/effects'
  import fetchApi from '../../api';
  const API_BASE_URL = 'https://api.vachanonline.net/v1/commentaries/'
  
  // function* fetchCommentaryLanguage(params) {
  //     try {
  //       const payload = params.payload 
  //       const languages = API_BASE_URL 
  //       const response = yield call(fetchApi,languages)
  //       const contentCommentry = {content:"Commentary",contentVersion:response}
  //       yield put(commentaryLanguageSuccess(contentCommentry))
  //       yield put(commentaryLanguageFailure(null))

  //     } catch (e) {
  //       yield put(commentaryLanguageFailure(e))
  //       yield put(commentaryLanguageSuccess([]))

  //     }
  // }
  
  function* fetchCommentaryContent(params){
    try {
    const payload = params.payload 
        const content = API_BASE_URL +payload.parallelContentSourceId+"/"+payload.bookId+"/"+payload.chapter
        const res = yield call(fetch,content)
        if(res.ok && res.status == 200){
        const result = yield res.json()
          yield put(commentaryContentSuccess(result))
          yield put(commentaryContentFailure(null))
        }else{
          yield put(commentaryContentFailure(e))
          yield put(commentaryContentSuccess([]))
        }
    } catch (e) {
    yield put(commentaryContentFailure(e))
    yield put(commentaryContentSuccess([]))

    } 
  }

  export const watchCommentary = [
    takeLatest(FETCH_COMMENTARY_CONTENT, fetchCommentaryContent)
  ]