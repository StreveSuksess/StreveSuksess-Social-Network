import {api} from "../firebase";

const SET_NEWS = "news/SET-NEWS";
const CHANGE_IS_FETCHING = "news/CHANGE-IS-FETCHING";

const defaultState = {
  news: [],
  isFetching: false,
}

function newsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: action.news,
      }
    case CHANGE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
    default: {
      return state;
    }
  }
}

function setNewsCreator(news) {
  return {
    type: SET_NEWS,
    news: news,
  }
}

export function changeIsFetchingCreator(isFetching) {
  return {
    type: CHANGE_IS_FETCHING,
    isFetching: isFetching,
  }
}


export const getNews = (userId) => async dispatch => {
  dispatch(changeIsFetchingCreator(true));
  const news = await api.getNews(userId);
  dispatch(setNewsCreator(news));
  dispatch(changeIsFetchingCreator(false));
}

export default newsReducer;