import {createSelector} from "reselect";

function getUsers(state) {
  return state.usersPage.users;
}

function getShowUsersCount(state) {
  return state.usersPage.showUsersCount;
}

function getUserId(state) {
  return state.auth.userId;
}

export function getSearchText(state) {
  return state.usersPage.searchText;
}


export const getShownUsers = createSelector(getUsers, getShowUsersCount, getUserId, getSearchText, (users, showUsersCount, userId, searchText) => {
  return Object.fromEntries(Object.entries(users)
    .filter(userEntry => userEntry[1].id !== userId && userEntry[1].name.toLowerCase().includes(searchText.toLowerCase()))
    .slice(0, showUsersCount));
})

export function getIsFetching(state) {
  return state.usersPage.isFetching
}

export function getUserSubscriptions(state) {
  return state.usersPage.userSubscriptions;
}