import {
  SET_USER_DATA,
  USER_EMAIL_CHANGE,
  USER_PASSWORD_CHANGE,
  REGISTER_USER_SUCCESS,
  IMAGE_UPLOAD_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  title: '',
  industry: '',
  bio: '',
  profileURL: '',
  pictureURL: '',
  password: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...action.payload };
    case USER_EMAIL_CHANGE:
      return { ...state, email: action.payload };
    case USER_PASSWORD_CHANGE:
      return { ...state, password: action.payload };
    case REGISTER_USER_SUCCESS:
      return { ...action.payload, password: '' };
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, pictureURL: action.payload };
    default:
      return state;
  }
};
