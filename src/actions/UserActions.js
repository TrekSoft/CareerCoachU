import firebase from 'react-native-firebase';
import {
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
      const photoURL = response.downloadURL;
      firebase.firestore().collection('users').doc(userId).update({ photoURL })
      .then(() => {
        dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: photoURL });
        resolve();
      })
      .catch((error) => reject(error.message));
    })
    .catch((error) => reject(error.message));
  });
};
