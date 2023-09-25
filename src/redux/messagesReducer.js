import {api, firestore} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";

const ADD_MESSAGE = "messages/ADD-MESSAGE";
const SET_MESSAGES = "messages/SET-MESSAGES";
const SET_AUTHORIZED_DATA = "messages/SET-AUTHORIZED-DATA";
const CHANGE_IS_FETCHING = "messages/CHANGE-IS-FETCHING";
const ADD_CHAT = "messages/ADD-CHAT";

const defaultState = {
  isFetching: false,
  newMessageText: "",
  authorizedName: "",
  authorizedAvatarUrl: "",
  chats: {},
}

function messagesReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.chatId]: {
            ...state.chats[action.chatId],
            messages: action.messages
          }
        }
      }
    case SET_AUTHORIZED_DATA:
      return {
        ...state,
        authorizedName: action.authorizedName,
        authorizedAvatarUrl: action.authorizedAvatarUrl
      }
    case CHANGE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case ADD_CHAT:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.chat.chatId]: action.chat
        }
      };
    default:
      return {...state};
  }
}

export function changeIsFetchingCreator(isFetching) {
  return {
    type: CHANGE_IS_FETCHING,
    isFetching: isFetching
  }
}

export function addChatCreator(chat) {
  return {
    type: ADD_CHAT,
    chat: chat
  }
}

export function setMessagesCreator(chatId, messages) {
  return {
    type: SET_MESSAGES,
    chatId: chatId,
    messages: messages
  }
}

export function addMessageCreator(chatId, message, userId) {
  return {
    type: ADD_MESSAGE,
    chatId: chatId,
    message: message,
    userId: userId,
  }
}


export function setAuthorizedDataCreator(name, avatarUrl) {
  return {
    type: SET_AUTHORIZED_DATA,
    authorizedName: name,
    authorizedAvatarUrl: avatarUrl
  }
}

async function addChatFlow(authorizedId, companionId, subOnCompanions, dispatch) {
  const chatIdWithCompanion = authorizedId > companionId ? authorizedId + companionId : companionId + authorizedId;
  subOnCompanions = Array.isArray(subOnCompanions) ? [...subOnCompanions, chatIdWithCompanion] : [chatIdWithCompanion]
  const companionData = await api.getProfileInfo(companionId);
  const chat = {
    avatar: companionData.avatar,
    name: companionData.name,
    chatId: chatIdWithCompanion,
    messages: []
  };
  dispatch(addChatCreator(chat));
  onSnapshot(doc(firestore, "chats", chatIdWithCompanion), (doc) => {
    dispatch(setMessagesCreator(chatIdWithCompanion, doc.data().messages));
  });
  return subOnCompanions;
}

export const initializeMessagesPage = (authorizedId, chatId) => async dispatch => {
  dispatch(changeIsFetchingCreator(true));
  let subOnCompanions = [];
  const chats = await api.getChats(authorizedId);
  if (chats) {
    for (const companionId of chats) {
      subOnCompanions = await addChatFlow(authorizedId, companionId, subOnCompanions, dispatch);
    }
  }
  if (!subOnCompanions.includes(chatId)) {
    const result = await api.createChat(chatId);
    if (result) {
      const companionId = chatId.slice(0, 28) === authorizedId ? chatId.slice(28) : chatId.slice(0, 28);
      await addChatFlow(authorizedId, companionId, subOnCompanions, dispatch);
    }
  }
  const authorizedData = await api.getProfileInfo(authorizedId);
  dispatch(setAuthorizedDataCreator(authorizedData.name, authorizedData.avatar))
  dispatch(changeIsFetchingCreator(false));
}

export const sendMessage = (chatId, message, userId) => async dispatch => {
  await api.sendMessage(chatId, message, userId);
}

export default messagesReducer;