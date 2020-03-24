import { FETCH_DICTIONARY_CONTENT, DICTIONARY_CONTENT_FAILURE, DICTIONARY_CONTENT_SUCCESS } from "../../actionsType";


export const fetchDictionaryContent = payload =>({
type: FETCH_DICTIONARY_CONTENT,
payload
})

export const dictionaryContentSuccess = payload => ({
  type: DICTIONARY_CONTENT_SUCCESS,
  payload
})

export const dictionaryContentFailure = error => ({
  type: DICTIONARY_CONTENT_FAILURE,
  error:error,
})
