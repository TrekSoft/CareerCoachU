import {
  SET_USER_DATA,
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
  pictureURL: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...action.payload };
    case REGISTER_USER_SUCCESS:
      return { ...action.payload };
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, pictureURL: action.payload };
    default:
      return state;
  }
};
