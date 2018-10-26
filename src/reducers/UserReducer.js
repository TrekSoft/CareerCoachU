import { PROFILE_PIC_PLACEHOLDER } from '../constants/ImageURLs';
import {
  SET_USER_DATA,
  UPDATE_USER_DATA,
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
  pictureURL: PROFILE_PIC_PLACEHOLDER,
  rate: 20,
  online: false,
  inPerson: false,
  topics: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...action.payload };
    case UPDATE_USER_DATA:
      return { ...state, ...action.payload };
    case REGISTER_USER_SUCCESS:
      return { ...action.payload };
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, pictureURL: action.payload };
    default:
      return state;
  }
};
