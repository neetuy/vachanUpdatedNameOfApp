import {UPDATE_COLOR_MODE,UPDATE_FONT_SIZE,UPDATE_COLOR,UPDATE_VERSE_IN_LINE,UPDATE_FONT_FAMILY} from './actionsType.js'

export const updateColorMode= (colorMode)=>{
    return {
        type:UPDATE_COLOR_MODE,
        colorMode:colorMode,
        // colorFile :colorFile,


    }
}
export const updateFontSize = (sizeMode)=>{
    return {
        type:UPDATE_FONT_SIZE,
        sizeMode:sizeMode,
        // sizeFile:sizeFile,
    }
}

export const updateVerseInLine = (inline)=>{
    return {
        type:UPDATE_VERSE_IN_LINE,
        verseInLine:inline
    }
}

export const updateFontFamily =(lang)=>{
    console.log("langugage in action redux ",lang)
    return{
        type:UPDATE_FONT_FAMILY,
        fontFamily:lang
    }
}
