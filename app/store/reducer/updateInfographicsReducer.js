import { UPDATE_INFOGRAPHICS,INDIVIDUAL_AUDIO , AUDIO_FOR_BOOKS} from '../action/actionsType';
const BASE_URL='https://raw.githubusercontent.com/neetuy/BibleContent/master/jpg_files/'

const initialState = {
    url:'https://raw.githubusercontent.com/neetuy/BibleContent/master/jpg_files/HIN/12%20Tribes_Map.jpg',
    fileName:"12 Tribes_Map"
}
function updateInfographicsReducer(state=initialState,action){
    switch(action.type) {
        case UPDATE_INFOGRAPHICS:
        return {
            ...state,
        url:BASE_URL+"HIN"+"/"+encodeURIComponent(action.fileName)+".jpg",
        fileName:action.fileName
        }
        default: 
        return state
    }
}

export default updateInfographicsReducer