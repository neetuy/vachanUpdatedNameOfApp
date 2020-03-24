import {FETCH_PARALLEL_BIBLE,PARALLEL_BIBLE_SUCCESS,PARALLEL_BIBLE_FAILURE,PARALLEL_SELECTED_BOOK,PARALLEL_SELECTED_CHAPTER,PARALLEL_SELECTED_VERSE} from '../../action/actionsType'

const initialState = {
    parallelBible:[],
    error:null,
    loading:false,
}
function parallelBibleReducer(state=initialState,action){
    switch(action.type) {
        case FETCH_PARALLEL_BIBLE:
        return{
            ...state,
            loading:true,
        }
        case PARALLEL_BIBLE_SUCCESS:
        return {
            ...state,
            loading:false,
            parallelBible:action.payload.parallelBible,
            
        }
        case PARALLEL_BIBLE_FAILURE:
        return {
            ...state,
            loading:false,
            error:action.error
        }
        default: 
        return state
    }
}

export default parallelBibleReducer