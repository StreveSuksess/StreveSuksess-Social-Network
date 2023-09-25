import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Preloader from "../Preloader/preloader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {getAvatar, getInfo, getIsFetching, getLoggedUserId, getName, getPosts} from "../../selectors/profileSelector";
import {compose} from "redux";
import {connect} from "react-redux";
import {addPost, changeProfileInfo, deletePost, editPost, getProfileInfo} from "../../redux/profileReducer";
import {getAuthStatus} from "../../redux/authReducer";
import {withLoginRedirect} from "../../hoc/withLoginRedirect";
import {withAuth} from "../../hoc/withAuth";
import MyPosts from "./MyPosts/MyPosts";
import styles from "./Profile.module.css";

function Profile(props) {
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const params = useParams();

  useEffect(() => {
    props.getProfileInfo(params.userId ? params.userId : props.loggedUserId);
    params.userId === props.loggedUserId ? setIsUserProfile(true) : setIsUserProfile(!params.userId)
  }, [params.userId, props.loggedUserId])

  const onSubmitPost = async (formData) => {
    await props.addPost(props.loggedUserId, formData.post)
  }

  const deletePost = async (postIndex) => {
    await props.deletePost(props.loggedUserId, postIndex, props.posts);
  }

  const editPost = async (postIndex, postMessage) => {
    await props.editPost(props.loggedUserId, postIndex, postMessage, props.posts);
  }

  const onSubmitEdit = (formData) => {
    const infoElements = {
      city: formData.city,
      status: formData.status,
      dateOfBirth: formData.dateOfBirth,
      education: formData.education,
      name: formData.firstName + " " + formData.lastName,
      avatar: avatar,
      profileImg: profileImg
    };
    props.changeProfileInfo(props.loggedUserId, infoElements);
  }

  return props.isFetching ? <Preloader/> :
    <div className={styles.profile}>
      <ProfileInfo info={props.info} isUserProfile={isUserProfile}
                   avatar={avatar}
                   setAvatar={setAvatar}
                   profileImg={profileImg}
                   setProfileImg={setProfileImg}
                   onSubmit={onSubmitEdit}
      />
      {props.loggedUserId &&
        <MyPosts posts={props.posts} avatar={props.avatar} name={props.name} onSubmit={onSubmitPost}
                 isUserProfile={isUserProfile} deletePost={deletePost} editPost={editPost}/>}
    </div>
}

function mapStateToProps(state) {
  return {
    info: getInfo(state),
    isFetching: getIsFetching(state),
    loggedUserId: getLoggedUserId(state),
    posts: getPosts(state),
    avatar: getAvatar(state),
    name: getName(state),
  }
}

export default compose(
  connect(mapStateToProps, {
    getProfileInfo,
    getAuthStatus,
    addPost,
    deletePost,
    editPost,
    changeProfileInfo
  }),
  withLoginRedirect,
  withAuth,
)(Profile);