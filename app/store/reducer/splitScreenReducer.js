import {CLOSE_SPLIT_SCREEN,UPDATE_DIMENSIONS} from '../action/actionsType';

const initialState = {
    close:true,
    height:null,
    width:null
}

function SplitScreenProps(state=initialState,action){
    switch(action.type) {
        case CLOSE_SPLIT_SCREEN:
        return {
            ...state,
            close:action.close,
        }
        case UPDATE_DIMENSIONS:
        return {
            ...state,
            height:action.height,
            width:action.width
        }
        default: 
        return state
    }
}

export default SplitScreenProps