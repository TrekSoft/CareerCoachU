import {
  SELECT_ROLE
} from './types';

export const selectRole = (roleId) => ({
  type: SELECT_ROLE,
  payload: roleId
});
