import { combineReducers } from 'redux';
import RolesReducer from './RolesReducer';
import SelectedRoleReducer from './SelectedRoleReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  roles: RolesReducer,
  selectedRoleId: SelectedRoleReducer,
  user: UserReducer
});
