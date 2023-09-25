import {initializeApp} from "firebase/app";
import {child, get, getDatabase, ref, set} from "firebase/database";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getDownloadURL, getStorage, ref as sRef, uploadBytesResumable} from "firebase/storage";
import {arrayUnion, doc, getFirestore, setDoc, Timestamp, updateDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_toHhRpf1HfuERMrTtRItDNBMD6uY2BA",
  authDomain: "strevesuksess-social-network.firebaseapp.com",
  databaseURL: "https://strevesuksess-social-network-default-rtdb.firebaseio.com",
  projectId: "strevesuksess-social-network",
  storageBucket: "strevesuksess-social-network.appspot.com",
  messagingSenderId: "707615795486",
  appId: "1:707615795486:web:62880f80498df31752410f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
export const firestore = getFirestore(app);

export const api = {
  async getProfileInfo(id) {
    const snapshot = await get(child(ref(db), `profiles/${id}`));
    const profileInfoData = snapshot.val();
    if (profileInfoData === null) return;
    return profileInfoData;
  },

  addUser({email, password, firstName, lastName, dateOfBirth, city, education, status}, avatar) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        let avatarUrl;
        if (avatar) {
          const avatarSnapshot = await uploadBytesResumable(sRef(storage, `users/${userCredential.user.uid}/avatar`), avatar);
          avatarUrl = await getDownloadURL(avatarSnapshot.ref);
        } else avatarUrl = "https://www.vippng.com/png/full/356-3563630_continue-marketing.png";
        await set(ref(db, 'profiles/' + userCredential.user.uid), {
          avatar: avatarUrl,
          city: city,
          dateOfBirth: dateOfBirth,
          education: education,
          name: `${firstName} ${lastName}`,
          profileImg: "https://pibig.info/uploads/posts/2022-05/1651860433_1-pibig-info-p-atmosfernie-oboi-na-rabochii-stol-krasivo-1.jpg",
          status: status,
          following: [],
          posts: [],
          chats: [],
        });
        await set(ref(db, 'users/' + userCredential.user.uid), {
          avatar: avatarUrl,
          id: userCredential.user.uid,
          name: `${firstName} ${lastName}`,
          status: status
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getAuthStatus() {
    const auth = getAuth();
    return auth.currentUser?.uid;
  },

  login(email, password) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user.uid;
      })
      .catch((error) => {
        alert("Invalid user");
        console.log(error)
        return false;
      });
  },

  async logOut() {
    const auth = getAuth();
    await signOut(auth);
  },

  async getUsers() {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `users`));
    const users = snapshot.val();
    if (users === null) return;
    return users;
  },

  async getUserSubscriptions(userId) {
    const snapshot = await get(child(ref(db), `profiles/${userId}/following`));
    return snapshot.val();
  },

  async pushToFollowing(userId, followedUserID) {
    try {
      const previousData = await api.getProfileInfo(userId);
      const newFollowing = previousData.following ? [...previousData.following, followedUserID] : [followedUserID];
      await set(ref(db, 'profiles/' + userId), {
        ...previousData,
        following: [...newFollowing]
      });
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  },

  async removeFromFollowing(userId, followedUserID) {
    try {
      const previousData = await api.getProfileInfo(userId);
      await set(ref(db, 'profiles/' + userId), {
        ...previousData,
        following: previousData.following.filter(user => user !== followedUserID)
      });
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  },

  async addPost(userId, post) {
    try {
      const previousData = await api.getProfileInfo(userId);
      const newPost = {
        text: post,
        time: Date.now()
      }
      const newPosts = previousData.posts ? [...previousData.posts, newPost] : [newPost];
      await set(ref(db, 'profiles/' + userId), {
        ...previousData,
        posts: [...newPosts]
      });
      return true;
    } catch (e) {
      console.log(e)
      return false;
    }
  },

  async getNews(userId) {
    const userSubscriptions = await api.getUserSubscriptions(userId);
    if (!userSubscriptions) return false;
    let news = [];
    for (const followedId of userSubscriptions) {
      const profileInfo = await api.getProfileInfo(followedId);
      const {name, avatar} = profileInfo;
      const posts = profileInfo.posts ? profileInfo.posts : []
      if (!posts) continue;
      posts.map(post => {
        post.name = name
        post.avatar = avatar
      })
      news = [...news, ...posts];
    }
    return news;
  },

  async deletePost(userId, postIndex) {
    try {
      const profileInfo = await api.getProfileInfo(userId);
      profileInfo.posts.splice(postIndex, 1);
      await set(ref(db, 'profiles/' + userId), {
        ...profileInfo,
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async editPost(userId, postIndex, postMessage) {
    try {
      const profileInfo = await api.getProfileInfo(userId);
      profileInfo.posts[postIndex].text = postMessage;
      await set(ref(db, 'profiles/' + userId), {
        ...profileInfo
      });
      return true;
    } catch (e) {
      console.log(e);
      return false
    }
  },

  async changeProfileInfo(userId, infoElements) {
    try {
      const profileInfo = await api.getProfileInfo(userId);
      const dbProfileRef = ref(db, 'profiles/' + userId);
      await set(dbProfileRef, {
        ...profileInfo,
        name: infoElements.name,
        city: infoElements.city,
        education: infoElements.education,
        dateOfBirth: infoElements.dateOfBirth,
        status: infoElements.status
      });
      if (infoElements.profileImg) {
        const profileImgSnapshot = await uploadBytesResumable(sRef(storage, `users/${userId}/profileImg`), infoElements.profileImg);
        const profileImgUrl = await getDownloadURL(profileImgSnapshot.ref);
        await set(dbProfileRef, {...profileInfo, profileImg: profileImgUrl});
      }
      const users = await api.getUsers();
      const dbUsersRef = ref(db, 'users/' + userId);
      await set(dbUsersRef, {
        ...users[userId],
        name: infoElements.name,
        status: infoElements.status
      });
      if (infoElements.avatar) {
        const avatarSnapshot = await uploadBytesResumable(sRef(storage, `users/${userId}/avatar`), infoElements.avatar);
        const avatarUrl = await getDownloadURL(avatarSnapshot.ref);
        await set(dbProfileRef, {...profileInfo, avatar: avatarUrl});
        await set(dbUsersRef, {
          ...users[userId],
          avatar: avatarUrl,
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      return false
    }
  },

  async getChats(userId) {
    try {
      const chatsSnapshot = await get(child(ref(db), `profiles/${userId}/chats`));
      const chats = chatsSnapshot.val();
      if (chats === null) return false;
      return chats;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async sendMessage(chatId, message, userId) {
    try {
      await updateDoc(doc(firestore, "chats", chatId), {
        messages: arrayUnion({
          userId: userId,
          date: Timestamp.now(),
          message: message
        })
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async createChat(chatId) {
    if (chatId?.length !== 56) return false;
    const firstUserId = chatId.slice(0, 28);
    const secondUserId = chatId.slice(28);
    const newChatData = {
      messages: []
    };
    try {
      await setDoc(doc(firestore, "chats", chatId), newChatData);
      const firstProfileInfo = await api.getProfileInfo(firstUserId);
      const secondProfileInfo = await api.getProfileInfo(secondUserId);
      const firstUserChats = firstProfileInfo?.chats ? Array.from(new Set([...firstProfileInfo.chats, secondUserId])) : [secondUserId];
      const secondUserChats = secondProfileInfo?.chats ? Array.from(new Set([...secondProfileInfo.chats, firstUserId])) : [firstUserId];
      await set(ref(db, 'profiles/' + firstUserId), {
        ...firstProfileInfo,
        chats: firstUserChats
      });
      await set(ref(db, 'profiles/' + secondUserId), {
        ...secondProfileInfo,
        chats: secondUserChats
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}


export default db;