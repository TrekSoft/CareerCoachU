import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import {
  USER_EMAIL_CHANGE,
  USER_PASSWORD_CHANGE,
  REGISTER_USER_SUBMIT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
} from './types';
import { USER_CREDENTIAL } from '../constants/StorageKeys';

export const userEmailChange = (email) => ({
  type: USER_EMAIL_CHANGE,
  payload: email
});

export const userPasswordChange = (password) => ({
  type: USER_PASSWORD_CHANGE,
  payload: password
});

export const registerUser = (user, password) => (dispatch) => {
  dispatch({ type: REGISTER_USER_SUBMIT });

  return new Promise((resolve, reject) => {
    if (!user || !user.email || !password) {
      const error = 'Email or password cannot be empty';
      dispatch({ type: REGISTER_USER_FAIL, payload: error });
      reject(error);
    } else {
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.email, password)
      .then((response) => {
        const id = response.user.uid;
        const ref = firebase.firestore().collection('users').doc(id);
        const userWithId = { ...user, id };

        ref.set(userWithId)
        .then(async (userCredential) => {
          try {
            console.log('up here');
            await AsyncStorage.setItem(USER_CREDENTIAL, userCredential);
            console.log('finished');
            dispatch({ type: REGISTER_USER_SUCCESS, payload: userWithId });
            resolve();
          } catch (error) {
              console.log(error);
              reject();
          }
        })
        .catch((error) => {
          dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
          reject(error);
        });
      })
      .catch((error) => {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
        reject(error);
      });
    }
  });
};
