import {FETCH_DICTIONARY_CONTENT,DICTIONARY_CONTENT_SUCCESS,DICTIONARY_CONTENT_FAILURE } from '../../action/actionsType'

const initialState = {
    dictionaryContent:[],
    error:null,
    loading:false
}
function fetchDictionaryReducer(state=initialState,action){
    switch(action.type) {
        case FETCH_DICTIONARY_CONTENT:
        return{
            ...state,
            loading:true,
        }
        case DICTIONARY_CONTENT_SUCCESS:
        return {
            ...state,
            loading:false,
            dictionaryContent:action.payload
        }
        case DICTIONARY_CONTENT_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.error
        }
        default: 
        return state
    }
}

export default fetchDictionaryReducer