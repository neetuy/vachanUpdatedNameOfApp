
import { FETCH_AUDIO_BOOKS,FETCH_AUDIO_URL } from '../../action/actionsType'
import {audioBooksFailure,audioBooksSuccess,audioURLFailure,audioURLSuccess}  from '../../action/'
import { put, takeLatest, call,fork } from 'redux-saga/effects'
import fetchApi from '../../api';
const GIT_BASE_API = 'https://github.com/Bridgeconn/vachancontentrepository/raw/master/'

    function* fetchAudioUrl(params){
        try {
            // var found = false
            const payload = params.payload
            const ver_code = payload.versionCode.toLowerCase()
            // const audioUrl = GIT_BASE_API +"audio_bibles"+"/"+ payload.languageCode + "/" + ver_code + "/" + "manifest.json"
            // const res = yield call(fetchApi,audioUrl)
            // for (var key in res.books){
                // if(payload.bookId == key){
                    // found = true
                    const url = GIT_BASE_API + "audio_bibles"+"/"+ payload.languageCode + "/" + ver_code + "/" + payload.bookId  + "/" + payload.chapter + ".mp3"
                    const response = yield call(fetch,url)
                    if(response.ok && response.status == 200){
                        yield put(audioURLSuccess(response.url))
                        yield put(audioURLFailure(null))
                    }
                    else{
                        yield put(audioURLFailure(e))
                        yield put(audioURLSuccess([]))
                    }
              

                    // break;
                // }
            // }
            // if(!found){
            //     yield put(audioURLSuccess(null)) 
            // }

        } catch (e) {
        yield put(audioURLFailure(e))
        yield put(audioURLSuccess([]))
        }
    }
    
    export const watchAudio = [
        takeLatest(FETCH_AUDIO_URL, fetchAudioUrl)
    ]
      
