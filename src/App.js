// import { FormControl, TextField } from "@material-ui/core";
import React, {  useEffect } from "react";
// import OfflinePinIcon from '@material-ui/icons/OfflinePin';
import PrimarySearchAppBar from "./Topbar";
// import Feed from "./Feed";
// import TweetInput from "./TweetInput";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp"; 
import { auth } from "./firebase"; //追加
import Toppage from "./Toppage";

const App = (props) => {


  useEffect(() => {
    // onAuthStateChanged→何らかのユーザー認証変化があったら実行される
    // その際に[user]内に格納される＝空だったら何も起こらない→つまりログインされていない状態
    const unSub = auth.onAuthStateChanged((user) => {
      // !user = falseとなる、つまりユーザーがログインしていない状態の時はログインページに飛ばす
      !user && props.history.push("login");
    });
    return () => unSub();
  });
  return (
    <div>
          <PrimarySearchAppBar title="トップページ"/>

          <Toppage/>
      {/* ログアウト用のボタンを追加 */}
      {/* <button
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
      </button> */}
    </div>
  );
};

export default App;