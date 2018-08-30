import {
  NOT_SUBMITTED,
  IN_PROGRESS,
  SUBMIT_SUCCESS,
  SUBMIT_ERROR
} from '../constants/SubmittedTypes';
import {
  COMING_SOON_EMAIL_CHANGE,
  COMING_SOON_EMAIL_SUCCESS,
  COMING_SOON_EMAIL_SUBMIT,
  COMING_SOON_EMAIL_FAIL
} from '../actions/types';

const INITIAL_STATE = { email: '', submitted: NOT_SUBMITTED };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMING_SOON_EMAIL_CHANGE:
      return { ...state, email: action.payload };
    case COMING_SOON_EMAIL_SUBMIT:
      return { ...state, submitted: IN_PROGRESS };
    case COMING_SOON_EMAIL_SUCCESS:
      return { ...state, submitted: SUBMIT_SUCCESS };
    case COMING_SOON_EMAIL_FAIL:
      return { ...state, submitted: SUBMIT_ERROR };
    default:
      return state;
  }
};
