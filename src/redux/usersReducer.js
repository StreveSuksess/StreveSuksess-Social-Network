import {api} from "../firebase";

const SET_USERS = "users/SET-USERS";
const SET_SEARCH_TEXT = "users/SET-SEARCH-TEXT";
const FOLLOW_USER = "users/FOLLOW-USER";
const UNFOLLOW_USER = "users/UNFOLLOW-USER";
const SET_USER_SUBSCRIPTIONS = "users/SET-USER-SUBSCRIPTIONS";
const CHANGE_SHOW_USERS_COUNT = "users/CHANGE-SHOW-USERS-COUNT";
const CHANGE_IS_FETCHING = "users/CHANGE-IS-FETCHING";

const defaultState = {
  users: [],
  isFetching: true,
  userSubscriptions: [],
  showUsersCount: 4,
  searchText: ""
}

function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
    case SET_USER_SUBSCRIPTIONS:
      return {
        ...state,
        userSubscriptions: action.userSubscriptions
      };
    case CHANGE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case CHANGE_SHOW_USERS_COUNT:
      return {
        ...state,
        showUsersCount: state.showUsersCount + action.showNumber,
      };
    case FOLLOW_USER:
      return {
        ...state,
        userSubscriptions: state?.userSubscriptions ? [...state.userSubscriptions, action.followedUserId] : [action.followedUserId]
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        userSubscriptions: state.userSubscriptions.filter(user => user !== action.followedUserId)
      };
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText
      };
    default:
      return state;
  }
}

export function followUserCreator(followedUserId) {
  return {
    type: FOLLOW_USER,
    followedUserId: followedUserId,
  }
}

export function unFollowUserCreator(followedUserId) {
  return {
    type: UNFOLLOW_USER,
    followedUserId: followedUserId,
  }
}


export function setUsersCreator(users) {
  return {
    type: SET_USERS,
    users: users,
  }
}

export function setUserSubscriptions(userSubscriptions) {
  return {
    type: SET_USER_SUBSCRIPTIONS,
    userSubscriptions: userSubscriptions,
  }
}

function changeIsFetchingCreator(isFetching) {
  return {
    type: CHANGE_IS_FETCHING,
    isFetching: isFetching,
  }
}

function changeShowUsersCountCreator(showNumber) {
  return {
    type: CHANGE_SHOW_USERS_COUNT,
    showNumber: showNumber,
  }
}

function setSearchTextCreator(searchText) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: searchText,
  }
}

async function setUsersFlow(userId, dispatch) {
  dispatch(changeIsFetchingCreator(true));
  const userSubscriptions = await api.getUserSubscriptions(userId);
  const users = await api.getUsers();
  dispatch(setUserSubscriptions(userSubscriptions));
  dispatch(setUsersCreator(users));
  dispatch(changeIsFetchingCreator(false));
}

export const setUsers = (userId) => async dispatch => {
  await setUsersFlow(userId, dispatch);
}

export const followUser = (userId, followedUserId) => async dispatch => {
  const result = await api.pushToFollowing(userId, followedUserId);
  if (!result) return;
  dispatch(followUserCreator(followedUserId));
}

export const unFollowUser = (userId, followedUserId) => async dispatch => {
  const result = await api.removeFromFollowing(userId, followedUserId);
  if (!result) return;
  dispatch(unFollowUserCreator(followedUserId));
}

export const changeShowUsersCount = (showNumber) => dispatch => {
  dispatch(changeShowUsersCountCreator(showNumber));
}

export const setSearchText = (searchText) => dispatch => {
  dispatch(setSearchTextCreator(searchText));
}


export default usersReducer;