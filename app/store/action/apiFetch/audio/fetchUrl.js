
import { FETCH_AUDIO_URL,AUDIO_URL_FAILURE, AUDIO_URL_SUCCESS } from '../../actionsType';

export const fetchAudioUrl = payload => ({
type: FETCH_AUDIO_URL,
payload
})

export const audioURLSuccess = url => ({
  type: AUDIO_URL_SUCCESS,
  url
})

export const audioURLFailure = error => ({
  type: AUDIO_URL_FAILURE,
  error:error,
})

