import { createStackNavigator } from 'react-navigation';
import RoleSelection from './RoleSelection';
import FindCoach from './FindCoach';
import BecomeCoach from './BecomeCoach';
import EditCoachProfile from './EditCoachProfile';
import RegisterPhotoName from './RegisterPhotoName';
import RegisterEmailPassword from './RegisterEmailPassword';

const Router = createStackNavigator(
  {
    RoleSelection,
    FindCoach,
    BecomeCoach,
    EditCoachProfile,
    RegisterEmailPassword,
    RegisterPhotoName
  },
  {
    initialRouteName: 'RoleSelection',
  }
);

export default Router;
