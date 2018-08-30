import { SELECT_ROLE } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_ROLE:
      return action.payload;
    default:
      return state;
  }
};
