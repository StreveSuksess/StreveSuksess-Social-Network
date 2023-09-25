export function getInfo(state) {
  return state.profilePage.profileInfo;
}

export function getIsFetching(state) {
  return state.profilePage.isFetching;
}

export function getLoggedUserId(state) {
  return state.auth.userId;
}

export function getPosts(state) {
  return state.profilePage.profileInfo.posts;
}

export function getAvatar(state) {
  return state.profilePage.profileInfo.avatar;
}

export function getName(state) {
  return state.profilePage.profileInfo.name;
}
