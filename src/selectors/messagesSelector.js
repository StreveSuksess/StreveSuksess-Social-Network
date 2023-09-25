export function getDialogs(state) {
  return state.messagesPage.chats;
}

export function getMessages(state) {
  return state.messagesPage.messages;
}

export function getAuthorizedName(state) {
  return state.messagesPage.authorizedName;
}

export function getAuthorizedAvatarUrl(state) {
  return state.messagesPage.authorizedAvatarUrl;
}

export function getIsFetching(state) {
  return state.messagesPage.isFetching;
}