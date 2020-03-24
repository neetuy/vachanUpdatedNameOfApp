import { FETCH_PARALLEL_BIBLE, PARALLEL_BIBLE_SUCCESS, PARALLEL_BIBLE_FAILURE,PARALLEL_SELECTED_BOOK,PARALLEL_SELECTED_CHAPTER,PARALLEL_SELECTED_VERSE } from "../actionsType";


export const fetchParallelBible = payload=>({
  type: FETCH_PARALLEL_BIBLE,
  payload
})

export const parallelBibleSuccess= payload => ({
  type: PARALLEL_BIBLE_SUCCESS,
  payload
})

export const parallelBiblefailure = error => ({
  type: PARALLEL_BIBLE_FAILURE,
  error:error,
})

