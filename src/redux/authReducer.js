import {api} from "../firebase";
import {getAuth} from "firebase/auth";

const SET_USER = "auth/SET-USER";

const defaultState = {
  logged: false,
  userId: null,
}

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        logged: !!action.userId,
        userId: action.userId,
      }
    default: {
      return state;
    }
  }
}

export function setUserCreator(userId) {
  return {
    type: SET_USER,
    userId: userId
  }
}

export const loginUser = ({email, password}) => async dispatch => {
  const result = await api.login(email, password);
  if (result) dispatch(setUserCreator(result));
}

export const getAuthStatus = () => dispatch => {
  const authStatus = api.getAuthStatus();
  dispatch(setUserCreator(authStatus ? authStatus : null));
}

export const addUser = (formData, avatar) => async () => {
  await api.addUser(formData, avatar);
}

export const logOutUser = () => async dispatch => {
  const auth = getAuth();
  await api.logOut(auth);
  dispatch(setUserCreator(null));
}

export default authReducer;