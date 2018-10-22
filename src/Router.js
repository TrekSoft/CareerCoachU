import { createStackNavigator } from 'react-navigation';
import RoleSelection from './RoleSelection';
import FindCoach from './FindCoach';
import BecomeCoach from './BecomeCoach';
import EditCoachProfile from './EditCoachProfile';
import RegisterPhotoName from './RegisterPhotoName';
import RegisterExperience from './RegisterExperience';
import RegisterTopics from './RegisterTopics';
import RegisterEmailPassword from './RegisterEmailPassword';

const Router = createStackNavigator(
  {
    RoleSelection,
    FindCoach,
    BecomeCoach,
    EditCoachProfile,
    RegisterEmailPassword,
    RegisterPhotoName,
    RegisterExperience,
    RegisterTopics
  },
  {
    initialRouteName: 'RoleSelection',
  }
);

export default Router;
