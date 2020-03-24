import {FETCH_AUDIO_URL,AUDIO_URL_FAILURE,AUDIO_URL_SUCCESS } from '../../action/actionsType'

const initialState = {
    url:null,
    error:null,
    loading:false
}
function fetchAudioReducer(state=initialState,action){
    switch(action.type) {
        case FETCH_AUDIO_URL:
        return{
            ...state,
            loading:true,
        }
        case AUDIO_URL_SUCCESS:
        return {
            ...state,
            loading:false,
            url:action.url
        }
        case AUDIO_URL_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.error
        }
        default: 
        return state
    }
}

export default fetchAudioReducer