import { FETCH_COMMENTARY_CONTENT, COMMENTARY_CONTENT_FAILURE, COMMENTARY_CONTENT_SUCCESS } from "../../actionsType";


export const fetchCommentaryContent = payload =>({
type: FETCH_COMMENTARY_CONTENT,
payload
})

export const commentaryContentSuccess = payload => ({
  type: COMMENTARY_CONTENT_SUCCESS,
  payload
})

export const commentaryContentFailure = error => ({
  type: COMMENTARY_CONTENT_FAILURE,
  error:error,
})
