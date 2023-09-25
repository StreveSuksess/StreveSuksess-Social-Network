import {getAuth, onAuthStateChanged} from "firebase/auth";
import {setUserCreator} from "./authReducer";

const SET_INITIALISED = "app/SET-INITIALISED";

const defaultState = {
  initialised: false,
}

function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_INITIALISED:
      return {
        ...state,
        initialised: true,
      }
    default: {
      return state;
    }
  }
}

function setInitialisedCreator() {
  return {
    type: SET_INITIALISED,
  }
}

export const initialise = () => dispatch => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    dispatch(setUserCreator(user?.uid ? user.uid : null));
    dispatch(setInitialisedCreator());
  });
}

export default appReducer;