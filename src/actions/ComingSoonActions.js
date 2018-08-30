import firebase from 'react-native-firebase';
import {
  COMING_SOON_EMAIL_CHANGE,
  COMING_SOON_EMAIL_SUBMIT,
  COMING_SOON_EMAIL_SUCCESS,
  COMING_SOON_EMAIL_FAIL
} from './types';

export const comingSoonEmailChange = (email) => ({
  type: COMING_SOON_EMAIL_CHANGE,
  payload: email
});

export const comingSoonEmailSubmit = (email) => {
  return (dispatch) => {
    dispatch({ type: COMING_SOON_EMAIL_SUBMIT });
    const ref = firebase.firestore().collection('comingSoonEmails');

    ref.add({ email })
    .then(() => { dispatch({ type: COMING_SOON_EMAIL_SUCCESS }); })
    .catch(() => { dispatch({ type: COMING_SOON_EMAIL_FAIL }); });
  };
};
