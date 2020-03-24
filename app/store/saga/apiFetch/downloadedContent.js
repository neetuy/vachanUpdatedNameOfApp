
import {FETCH_DOWNLOADED_VERSION_CONTENT} from '../../action/actionsType'
import {versionContentDownloadedSuccess,versionContentDownloadedFailure}  from '../../action/'

import { put, takeLatest, call,fork,all } from 'redux-saga/effects'
import DbQueries from '../../../utils/dbQueries'
import AsyncStorageUtil from '../../../utils/AsyncStorageUtil'
import {AsyncStorageConstants} from '../../../utils/AsyncStorageConstants'

const API_BASE_URL = 'https://api.autographamt.com/v1/'

  function* fetchDownloadedVersionContent(params){
    try {
    let chapterContent = []
    // let totalVerses=null
    const payload = params.payload
    let downloaded = yield AsyncStorageUtil.getAllItems([
      AsyncStorageConstants.Keys.Downloaded,
    ])
    console.log("payload.isDownloaded ",payload.isDownloaded)
  if(downloaded[0][1]) {
    const response = yield DbQueries.queryVersions(payload.language,payload.version,payload.bookId,payload.chapter) 
    console.log(" downloaded ......",response)
    // chapterContent = response[0]
    yield put(versionContentDownloadedSuccess(response[0]))
    yield put(versionContentDownloadedFailure(null))
  }
}
  catch(e){
    console.log("ERROR IN DOWNLOADED BOOK ",e)
    yield put(versionContentDownloadedFailure(e))
    yield put(versionContentDownloadedSuccess([]))
  }
  }
  export const watchDownloadedContent = [
    takeLatest(FETCH_DOWNLOADED_VERSION_CONTENT, fetchDownloadedVersionContent)
  ]