import {FETCH_DOWNLOADED_VERSION_CONTENT, VERSION_DOWNLOADED_CONTENT_FAILURE, VERSION_DOWNLOADED_CONTENT_SUCCESS } from '../../action/actionsType'

const initialState = {
    downloadedChapter:[],
    error:null,
    loading:false
}
function downloadedContentReducer(state=initialState,action){
    switch(action.type) {
        case FETCH_DOWNLOADED_VERSION_CONTENT:
        return{
            ...state,
            loading:true,
        }
        
        case VERSION_DOWNLOADED_CONTENT_SUCCESS:
        return {
            ...state,
            loading:false,
            downloadedChapter:action.payload,
        }
        case VERSION_DOWNLOADED_CONTENT_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.error
        }
        default: 
        return state
    }
}

export default downloadedContentReducer