import firebase from 'react-native-firebase';
import {
  UPDATE_USER_DATA,
  REGISTER_USER_SUCCESS,
  IMAGE_UPLOAD_SUCCESS
} from './types';

export const registerUser = (user, email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    if (!email || !password) {
      const error = 'Email or password cannot be empty';
      reject(error);
    } else {
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email.trim(), password)
      .then((response) => {
        const id = response.user.uid;
        const userWithId = { ...user, id, email };

        firebase.firestore().collection('users').doc(id).set(userWithId)
        .then(() => {
            dispatch({ type: REGISTER_USER_SUCCESS, payload: userWithId });
            resolve();
        })
        .catch((error) => {
          reject(error.message);
        });
      })
      .catch((error) => {
        reject(error.message);
      });
    }
  });
};

export const uploadProfilePic = (userId, uri) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.storage().ref(`profilePics/${userId}.jpg`).putFile(uri)
    .then((response) => {
      const pictureURL = response.downloadURL;
      firebase.firestore().collection('users').doc(userId).update({ pictureURL })
      .then(() => {
        dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: pictureURL });
        resolve();
      })
      .catch((error) => reject(error.message));
    })
    .catch((error) => reject(error.message));
  });
};

export const updateUser = (userId, fields) => (dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection('users').doc(userId).update(fields)
    .then(() => {
      dispatch({ type: UPDATE_USER_DATA, payload: fields });
      resolve();
    })
    .catch((error) => reject(error.message));
  });
};
