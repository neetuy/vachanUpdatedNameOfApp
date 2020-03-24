import {CLOSE_SPLIT_SCREEN,UPDATE_DIMENSIONS} from './actionsType.js'

export const closeSplitScreen= (close)=>{
    return {
        type:CLOSE_SPLIT_SCREEN,
        close:close,
    }
}
export const updateDimensions= (height,width)=>{
    return {
        type:UPDATE_DIMENSIONS,
        heigh:height,
        width:width
    }
}

