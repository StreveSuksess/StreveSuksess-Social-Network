import {Route, Routes} from "react-router-dom";
import "./css/App.css";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Profile from "./components/Profile/Profile";
import MessagesContainer from "./components/Messages/MessagesContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import {connect} from "react-redux";
import {compose} from "redux";
import Preloader from "./components/Preloader/preloader";
import {initialise} from "./redux/appReducer";
import {useEffect} from "react";
import NewsContainer from "./components/News/NewsContainer";
import Settings from "./components/Settings/Settings";


function App(props) {
  useEffect(() => {
    props.initialise();
  }, []);

  if (!props.initialised) {
    return <Preloader/>
  }
  return (
    <div className="App">
      <Header/>
      <div className="main container">
        <Navigation/>
        <Routes>
          <Route path="/"
                 element={<Profile/>}/>
          <Route path="/profile/:userId?"
                 element={<Profile/>}/>
          <Route path="/messages/:chatId?"
                 element={<MessagesContainer/>}/>
          <Route path="/news/*" element={<NewsContainer/>}/>
          <Route path="/users/:filter?" element={<UsersContainer/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    initialised: state.app.initialised,
  }
}

export default compose(
  connect(mapStateToProps, {initialise}),
)(App);
