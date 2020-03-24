import { UPDATE_INFOGRAPHICS} from "./actionsType";

export const updateInfographics = (fileName)=>{
    return {
        type:UPDATE_INFOGRAPHICS,
        fileName:fileName
    }
}

