import {connect} from "react-redux";
import Users from "./Users";
import {changeShowUsersCount, followUser, setSearchText, setUsers, unFollowUser} from "../../redux/usersReducer";
import Preloader from "../Preloader/preloader";
import {withAuth} from "../../hoc/withAuth";
import {withLoginRedirect} from "../../hoc/withLoginRedirect";
import {compose} from "redux";
import {useEffect} from "react";
import {getIsFetching, getSearchText, getShownUsers, getUserSubscriptions} from "../../selectors/usersSelector";
import {useParams} from "react-router-dom";

const showNumber = 4;

function UsersContainer(props) {
  const params = useParams();

  useEffect(() => {
    props.setUsers(props.userId);
  }, [])

  function showFunction() {
    props.changeShowUsersCount(showNumber);
  }

  function setSearchText(searchText) {
    props.setSearchText(searchText);
  }

  async function followUser(followedUserId) {
    await props.followUser(props.userId, followedUserId);
  }

  async function unFollowUser(followedUserId) {
    await props.unFollowUser(props.userId, followedUserId);
  }

  if (props.isFetching || props.loading) return <Preloader/>;
  else {
    return <Users
      users={params.filter === "following" ? Object.fromEntries(Object.entries(props.users).filter(userEntry => props.userSubscriptions?.includes(userEntry[1].id))) : props.users}
      userSubscriptions={props.userSubscriptions}
      followUser={followUser}
      unFollowUser={unFollowUser}
      showFunction={showFunction}
      userId={props.userId}
      setSearchText={setSearchText}
      searchText={props.searchText}
    />
  }
}

function mapStateToProps(state) {
  return {
    users: getShownUsers(state),
    searchText: getSearchText(state),
    isFetching: getIsFetching(state),
    userSubscriptions: getUserSubscriptions(state),
  }
}

export default compose(
  withAuth,
  connect(mapStateToProps, {setUsers, followUser, unFollowUser, changeShowUsersCount, setSearchText}),
  withLoginRedirect
)(UsersContainer);