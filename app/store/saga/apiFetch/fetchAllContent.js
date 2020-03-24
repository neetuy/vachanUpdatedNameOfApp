
import {FETCH_ALL_CONTENT,FECTH_ALL_LANGUAGE } from '../../action/actionsType'
import {allContentFailure,allContentSuccess,allLanguageFailure,allLanguageSuccess}  from '../../action/'
import { put, takeLatest, call,fork,all } from 'redux-saga/effects'
import fetchApi from '../../api';
const API_BASE_URL = 'https://api.vachanonline.net/v1/'

//fetch audio available book ,audio file 
  function* fetchAllContent() {
    try {
      const bibleAPI = API_BASE_URL + 'bibles'
      const commentaryAPI = API_BASE_URL + 'commentaries'
      const dictionaryAPI = API_BASE_URL + 'dictionaries'
      const [bibleLanguage,commentaryLanguage,dictionariesLanguage] = yield all([
        call(fetchApi,bibleAPI),
        call(fetchApi, commentaryAPI),
        call(fetchApi,dictionaryAPI)
      ])

    const  bible = []
    const commentary = []
    const dictionary = []

     for(var i = 0; i<bibleLanguage.length;i++){
      var versions = []
      const language =bibleLanguage[i].language.charAt(0).toUpperCase() +bibleLanguage[i].language.slice(1)
        let languageCode=''
      for(var j= 0; j<bibleLanguage[i].languageVersions.length;j++){
        languageCode = bibleLanguage[i].languageVersions[j].language.code
        const  {version} =bibleLanguage[i].languageVersions[j]
        versions.push({sourceId:bibleLanguage[i].languageVersions[j].sourceId,versionName:version.name,versionCode:version.code,license:"license",year:2019,downloaded:false})
      }
      bible.push({languageName:language,languageCode:languageCode,versionModels:versions})
    }
    for(var i = 0; i<commentaryLanguage.length;i++){
      var versions = []
      const language =commentaryLanguage[i].language.charAt(0).toUpperCase() + commentaryLanguage[i].language.slice(1)
        const languageCode = commentaryLanguage[i].languageCode
      for(var j= 0; j<commentaryLanguage[i].commentaries.length;j++){
        versions.push({sourceId:commentaryLanguage[i].commentaries[j].sourceId,versionName:commentaryLanguage[i].commentaries[j].name,versionCode:commentaryLanguage[i].commentaries[j].code,license:"license",year:2019,downloaded:false})
      }
      commentary.push({languageName:language,languageCode:languageCode,versionModels:versions})
    }
    for(var i = 0; i<dictionariesLanguage.length;i++){
      var versions = []
      const language =dictionariesLanguage[i].language.charAt(0).toUpperCase() + dictionariesLanguage[i].language.slice(1)
        const languageCode = dictionariesLanguage[i].languageCode
      for(var j= 0; j<dictionariesLanguage[i].dictionaries.length;j++){
        versions.push({sourceId:dictionariesLanguage[i].dictionaries[j].sourceId,versionName:dictionariesLanguage[i].dictionaries[j].name,versionCode:dictionariesLanguage[i].dictionaries[j].code,license:"license",year:2019,downloaded:false})
      }
      dictionary.push({languageName:language,languageCode:languageCode,versionModels:versions})
    }
    yield put(allContentSuccess([{contentType:"bible",content:bible},{contentType:"commentary",content:commentary},{contentType:"dictionary",content:dictionary}]))
    yield put(allContentFailure(null))
    
  } catch (e) {
      console.log("commentary error ",error)
    yield put(allContentFailure(e))
    yield put(allContentSuccess([]))
    }
  }
  function* fetchAllLanguage(){
    try {
      const response = yield call(fetchApi,'https://api.vachanonline.net/v1/languages')
      yield put(allLanguageSuccess(response))
      yield put(allLanguageFailure(null))

      } catch (e) {
      yield put(allLanguageFailure(e))
      yield put(allLanguageSuccess([]))

      }
  }
  
  export const watchAllContent = [
    takeLatest(FETCH_ALL_CONTENT, fetchAllContent),
    takeLatest(FECTH_ALL_LANGUAGE, fetchAllLanguage),
  ]
  





