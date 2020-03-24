import {FETCH_COMMENTARY_CONTENT,COMMENTARY_CONTENT_SUCCESS,COMMENTARY_CONTENT_FAILURE } from '../../action/actionsType'

const initialState = {
    commentaryContent:[],
    error:null,
    loading:false
}
function fetchCommentaryReducer(state=initialState,action){
    switch(action.type) {
        case FETCH_COMMENTARY_CONTENT:
        return{
            ...state,
            loading:true,
        }
        case COMMENTARY_CONTENT_SUCCESS:
        return {
            ...state,
            loading:false,
            commentaryContent:action.payload
        }
        case COMMENTARY_CONTENT_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.error
        }
        default: 
        return state
    }
}

export default fetchCommentaryReducer