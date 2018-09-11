import firebase from 'react-native-firebase';
import { LINKEDIN } from '../constants/ErrorCodes';
import { SET_USER_DATA } from './types';

export const getLinkedInData = (auth) => (dispatch) => {
  const baseApi = 'https://api.linkedin.com/v1/people/';
  const params = [
    'first-name',
    'last-name',
    'headline',
    'industry',
    'picture-urls::(original)',
    'summary',
    'public-profile-url',
    'email-address'
  ];

  return fetch(
    `${baseApi}~:(${params.join(',')})?format=json`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`
      }
    }
  )
  .then((response) => response.json())
  .then((response) => {
    dispatch({
      type: SET_USER_DATA,
      payload: {
        firstName: response.firstName,
        lastName: response.lastName,
        title: response.headline,
        industry: response.industry,
        pictureURL: response.pictureUrls.values[0],
        profileURL: response.publicProfileUrl,
        bio: response.summary,
        email: response.emailAddress
      }
    });
  }
  )
  .catch((error) => firebase.crashlytics().reportError(LINKEDIN, error));
};
