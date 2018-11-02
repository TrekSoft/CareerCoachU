import firebase from 'react-native-firebase';
import { LINKEDIN } from '../constants/ErrorCodes';
import { PROFILE_PIC_PLACEHOLDER } from '../constants/ImageURLs';
import { UPDATE_USER_DATA } from './types';

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
    const pictureURL = response.pictureUrls.values.length > 0 ?
      response.pictureUrls.values[0] : PROFILE_PIC_PLACEHOLDER;

    dispatch({
      type: UPDATE_USER_DATA,
      payload: {
        firstName: response.firstName,
        lastName: response.lastName,
        title: response.headline,
        industry: response.industry,
        pictureURL,
        profileURL: response.publicProfileUrl,
        bio: response.summary,
        email: response.emailAddress
      }
    });
  }
  )
  .catch((error) => firebase.crashlytics().reportError(LINKEDIN, error));
};
