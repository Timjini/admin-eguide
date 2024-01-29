// actions/userActions.js
import { updateUser } from '../userSlice';

export const updateUserAction = (userData) => (dispatch) => {
  dispatch(updateUser(userData));
};
