import firebase from 'react-native-firebase';
import {
  USER_EMAIL_CHANGE,
  USER_PASSWORD_CHANGE,
  REGISTER_USER_SUBMIT,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL
} from './types';

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
        const userWithId = { ...user, id };

        firebase.firestore().collection('users').doc(id).set(userWithId)
        .then(() => {
            dispatch({ type: REGISTER_USER_SUCCESS, payload: userWithId });
            resolve();
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

export const uploadImage = (user, uri, imageName) => {
  return (dispatch) => {
    firebase.storage().ref(`profilePics/${imageName}`).putFile(uri)
    .then((photoURL) => {
      firebase.firestore().collection('users').doc(user.id).update({ photoURL })
      .then(() => dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: photoURL }))
      .catch((error) => dispatch({ type: IMAGE_UPLOAD_FAIL, payload: error }));
    })
    .catch((error) => dispatch({ type: IMAGE_UPLOAD_FAIL, payload: error }));
  };
};
