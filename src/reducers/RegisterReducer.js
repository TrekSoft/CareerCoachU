import {
  NOT_SUBMITTED,
  IN_PROGRESS
} from '../constants/SubmittedTypes';
import {
  REGISTER_USER_SUBMIT,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  submitted: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER_SUBMIT:
      return { ...state, submitted: IN_PROGRESS, error: '' };
    case REGISTER_USER_FAIL:
      return { ...state, submitted: NOT_SUBMITTED, error: action.payload };
    case REGISTER_USER_SUCCESS:
      return { ...state, submitted: NOT_SUBMITTED, error: '' };
    default:
      return state;
  }
};
