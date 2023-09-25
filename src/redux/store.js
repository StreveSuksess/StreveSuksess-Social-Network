import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleWare from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import appReducer from "./appReducer";
import newsReducer from "./newsReducer";

const reducers = combineReducers({
  app: appReducer,
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
  auth: authReducer,
  news: newsReducer,
  form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;