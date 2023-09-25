import {api} from "../firebase";

const ADD_POST = "profile/ADD-POST";
const CHANGE_POST_AREA = "profile/CHANGE-POST-AREA";
const GET_PROFILE_INFO = "profile/GET-PROFILE-INFO"
const SET_PROFILE_INFO = "profile/SET-PROFILE-INFO"
const SET_POSTS = "profile/SET-POSTS"
const CHANGE_IS_FETCHING = "profile/CHANGE-IS-FETCHING";

const defaultState = {
  newPostMessage: "",
  isFetching: false,
  profileInfo: {}
}

function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          ...action.info
        }
      };
    case ADD_POST:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          posts: state.profileInfo?.posts ? [...state.profileInfo.posts, action.post] : [action.post]
        }
      };
    case CHANGE_POST_AREA:
      return {
        ...state,
        newPostMessage: action.text
      };
    case GET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: action.info
      };
    case CHANGE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case SET_POSTS:
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          posts: action.posts
        }
      };
    default:
      return state;
  }
}

export function addPostCreator(post) {
  return {
    type: ADD_POST,
    post: post
  }
}

export function getProfileInfoCreator(info) {
  return {
    type: GET_PROFILE_INFO,
    info: info
  }
}

export function changeIsFetchingCreator(isFetching) {
  return {
    type: CHANGE_IS_FETCHING,
    isFetching: isFetching,
  }
}

export function setPostsCreator(posts) {
  return {
    type: SET_POSTS,
    posts: posts,
  }
}

const getProfileInfoFlow = async (id, dispatch) => {
  dispatch(changeIsFetchingCreator(true));
  const profileInfoData = await api.getProfileInfo(id);
  dispatch(getProfileInfoCreator(profileInfoData));
  dispatch(changeIsFetchingCreator(false));
}

export const getProfileInfo = id => async dispatch => {
  await getProfileInfoFlow(id, dispatch)
}

export const addPost = (userId, postMessage) => async dispatch => {
  const result = await api.addPost(userId, postMessage);
  if (!result) return;
  const post = {
    text: postMessage,
    time: Date.now()
  }
  dispatch(addPostCreator(post));
}

export const deletePost = (userId, postIndex, posts) => async dispatch => {
  const result = await api.deletePost(userId, postIndex);
  if (!result) return;
  posts.splice(postIndex, 1);
  dispatch(setPostsCreator(posts));
}

export const editPost = (userId, postIndex, postMessage, posts) => async dispatch => {
  const result = await api.editPost(userId, postIndex, postMessage);
  if (!result) return;
  posts[postIndex].text = postMessage;
  dispatch(setPostsCreator(posts));
}

export const changeProfileInfo = (userId, infoElements) => async dispatch => {
  const result = await api.changeProfileInfo(userId, infoElements);
  if (!result) return;
  await getProfileInfoFlow(userId, dispatch);
}


export default profileReducer;