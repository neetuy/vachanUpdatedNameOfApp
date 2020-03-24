
import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import { persistStore, persistReducer } from 'redux-persist';

import editNoteReducer from "./editNoteReducer";
import updateVersionReducer from './updateVersionReducer';
import updateStylingReducer from './updateStylingReducer';
import splitScreenReducer from './splitScreenReducer';
import updateInfographicsReducer from './updateInfographicsReducer'
import fetchVersionReducer from './apiFetchReducer/fetchVersionReducer'
import fetchCommentaryReducer from './apiFetchReducer/fetchCommentaryReducer'
import fetchDictionaryReducer from './apiFetchReducer/fetchDictionaryReducer'
import fetchAudioReducer from './apiFetchReducer/fetchAudioReducer'
import fetchContentReducer from './apiFetchReducer/fetchContentReducer'
import parallelBibleReducer from './apiFetchReducer/parallelBibleReducer'
import downloadedContent from './apiFetchReducer/downloadedContentReducer'


 const rootReducer = combineReducers({
    editNote: editNoteReducer,
    updateVersion:updateVersionReducer,
    updateStyling:updateStylingReducer,
    updateSplitScreen:splitScreenReducer,
    infographics:updateInfographicsReducer,
    versionFetch:fetchVersionReducer,
    commentaryFetch:fetchCommentaryReducer,
    dictionaryFetch:fetchDictionaryReducer,
    audioFetch:fetchAudioReducer,
    contents:fetchContentReducer,
    parallel:parallelBibleReducer,
    downloadedBible:downloadedContent
})

export default  rootReducer