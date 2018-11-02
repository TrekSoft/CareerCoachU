import { PROFILE_PIC_PLACEHOLDER } from '../constants/ImageURLs';
import {
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
  rate: 0,
  online: false,
  inPerson: false,
  topics: [],
  address: '',
  longitude: '',
  latitude: '',
  range: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
