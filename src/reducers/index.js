import { combineReducers } from 'redux';
import RolesReducer from './RolesReducer';
import SelectedRoleReducer from './SelectedRoleReducer';
import ComingSoonReducer from './ComingSoonReducer';
import UserReducer from './UserReducer';
import RegisterReducer from './RegisterReducer';

export default combineReducers({
  roles: RolesReducer,
  selectedRoleId: SelectedRoleReducer,
  comingSoon: ComingSoonReducer,
  user: UserReducer,
  register: RegisterReducer
});
