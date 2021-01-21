import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route, BrowserRouter,Switch} from "react-router-dom";
import Login from "./Login";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"; //追加
import TweetInput from "./TweetInput";
import Detail from "./Detail";
import Feedsec from "./Feedsec";
import Booking from "./Booking";




const title = 'iCoach';
// title
document.title = title;

const user = firebase.auth().currentUser;
var email, photoUrl, uid, emailVerified;
      
      if (user != null) {
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; }


console.log(user);
ReactDOM.render(

  <BrowserRouter >
  {/* <ConnectedRouter history={history}> */}
    <Switch>
      {/* ログインしたときはAppを表示 */}
      <Route exact path="/" component={App} />
      {/* 個人情報登録 */}
      <Route exact path="/tweetinput" component={TweetInput} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/feedsec" component={Feedsec} />
      <Route exact path="/booking" component={Booking} />
      {/* ログインしていないときはLoginを表示 */}
      <Route exact path="/login" component={Login} />
    </Switch>
    {/* <li>
            <Link to="/tweetinput">入力</Link>
            <Link to="/detail">編集・確認</Link>
            <Link to="/feedsec">Feedsec</Link>
            <Link to="/booking">Booking</Link>
          </li> */}
  {/* </ConnectedRouter> */}
  </BrowserRouter>,
  document.getElementById("root")
);
