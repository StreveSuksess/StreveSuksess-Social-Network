import React, {useEffect} from "react";
import {initializeMessagesPage, sendMessage} from "../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuth} from "../../hoc/withAuth";
import {withLoginRedirect} from "../../hoc/withLoginRedirect";
import {
  getAuthorizedAvatarUrl,
  getAuthorizedName,
  getDialogs,
  getIsFetching,
  getMessages
} from "../../selectors/messagesSelector";
import {useNavigate, useParams} from "react-router-dom";
import Preloader from "../Preloader/preloader";


function MessagesContainer(props) {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.chatId && (params.chatId.length !== 56 || params.chatId.indexOf(props.userId) === -1)) {
      alert("Чата не существует или он не ваш");
      navigate("/messages");
    }
    props.initializeMessagesPage(props.userId, params.chatId);
  }, [props.userId])

  function onSubmit(message) {
    props.sendMessage(params.chatId, message, props.userId);
  }


  return props.isFetching ? <Preloader/> : <Messages dialogs={props.dialogs}
                                                     onSubmit={onSubmit}
                                                     chatId={params.chatId}
                                                     authorizedId={props.userId}
                                                     authorizedName={props.authorizedName}
                                                     authorizedAvatarUrl={props.authorizedAvatarUrl}
  />
}

function mapStateToProps(state) {
  return {
    dialogs: getDialogs(state),
    messages: getMessages(state),
    isFetching: getIsFetching(state),
    authorizedName: getAuthorizedName(state),
    authorizedAvatarUrl: getAuthorizedAvatarUrl(state)
  }
}

export default compose(
  connect(mapStateToProps, {initializeMessagesPage, sendMessage}),
  withAuth,
  withLoginRedirect,
)(MessagesContainer);