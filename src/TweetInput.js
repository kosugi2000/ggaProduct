//データ登録するファイル
import React, { useState ,useEffect} from "react";
import { storage, db } from "./firebase";
import firebase from "firebase/app";
import { Button } from "@material-ui/core";
import PrimarySearchAppBar from "./Topbar";
import "./styles.css";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width:"40%",
      maxWidth : "300px",
    },
  },
}));


const TweetInput = () => {
//スタイル
const classes = useStyles();

 // Auth
 var user = firebase.auth().currentUser;
 var email, photoUrl, uid, emailVerified;
 
 if (user != null) {
   email = user.email;
   photoUrl = user.photoURL;
   emailVerified = user.emailVerified;
   uid = user.uid; }

//firebaseに作成した項目を受け取るための変数＝useState（状態）
const [posts, setPosts] = useState([
 {
   id: "",
   name: "",
   nametag: "",
   age: "",
   region: "",
   c1name: "",
   c1term: "",
   c1position: "",
   c1job: "",
   c2name: "",
   c2term: "",
   c2position: "",
   c2job: "",
   other: "",
   demand: "",
   uid: "",
   timestamp: null,
 },
]);

useEffect(() => {
const myData = db.collection("posts").where("uid", "==", uid)
           .get()
           .then(function(querySnapshot) {
               querySnapshot.forEach(function(doc) {
                   // doc.data() is never undefined for query doc snapshots
                   setPosts({
                       id: doc.id,
                       name: doc.data().name,
                       text: doc.data().text,
                       nametag: doc.data().nametag,
                       age: doc.data().age,
                       region: doc.data().region,
                       c1name: doc.data().c1name,
                       c1term: doc.data().c1term,
                       c1position: doc.data().c1position,
                       c1job: doc.data().c1job,
                       c2name: doc.data().c2name,
                       c2term: doc.data().c2term,
                       c2position: doc.data().c2position,
                       c2job: doc.data().c2job,
                       other: doc.data().other,
                       demand: doc.data().demand,
                       uid: doc.data().uid,
                       image: doc.data().image,
                       timestamp: doc.data().timestamp
                     })
                   console.log(doc.id, " => ", doc.data());
               });
           })
           
         }, []);
         console.log("postsのデータ",posts);



  // 記述3. useStateを用意します 画像を保持する箱、入力された文字列を保持する箱
  const [inputImage, setInputImage] = useState(null);
  const [ name ,setName] = useState("");
  const [ nametag, setNametag] = useState("");
  const [ age, setAge] = useState("");
  const [ region, setRegion] = useState("");
  const [ c1name, setC1name] = useState("");
  const [ c1term, setC1term] = useState("");
  const [ c1position, setC1position] = useState("");
  const [ c1job, setC1job] = useState("");
  const [ c2name, setC2name] = useState("");
  const [ c2term, setC2term] = useState("");
  const [ c2position, setC2position] = useState("");
  const [ c2job, setC2job] = useState("");
  const [ other, setOther] = useState("");
  const [ demand, setDemand] = useState("");
  




  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setInputImage(e.target.files[0]);
      e.target.value = "";
    }
  };




  // 記述7.送信処理を記述
  const sendTweet = (e) => {
    // 状態を確認する
    e.preventDefault();
    if (inputImage) {
      // 画像 + テキストの処理
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元々あったファイルが削除される
      // そのためにファイル名をランダムなファイル名を作る必要がある、それが下
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補、62文字
      const N = 16; //16文字の文字列を作るという意味　生成したい文字数が１６の文字列になる
      const randomMoji = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が１６こ選ばれる
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomMoji + "_" + inputImage.name;
      // firebase storageに登録する処理
      const uploadTweetImg = storage.ref(`images/${fileName}`).put(inputImage);
      // firebaseのDBに登録する処理
      uploadTweetImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {}, //進捗度合いの管理するもの、
        (err) => {
          //エラーに関する処理
          alert(err.message);
        },
        async () => {
          //成功したとき
          await storage
            .ref("images")
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection('posts').doc(uid).set({
                name: name,
                nametag: nametag,
                age: age,
                region: region,
                c1name: c1name,
                c1term: c1term,
                c1position: c1position,
                c1job: c1job,
                c2name: c2name,
                c2term: c2term,
                c2position: c2position,
                c2job: c2job,
                other: other,
                demand: demand,
                uid: uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    } else {
      // テキストだけの処理
      db.collection('posts').doc(uid).set({
        image: "",
        name: name,
        nametag: nametag,
        age: age,
        region: region,
        c1name: c1name,
        c1term: c1term,
        c1position: c1position,
        c1job: c1job,
        c2name: c2name,
        c2term: c2term,
        c2position: c2position,
        c2job: c2job,
        other: other,
        demand: demand,
        uid: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setInputImage(null);
    setName("");
  };
  console.log("postsのデータ4",posts);

 
  
       
  console.log("postsname",posts.name);
  const initialName = posts.name
  console.log("postsのデータ2",initialName);

  return (
    <div>
      

          <PrimarySearchAppBar title="新規登録"/>
      {/* 記述1. formのタグを書く */}
      <form onSubmit={sendTweet} className={classes.root}>
        {/* 記述2 inputタグを書きます */}
        <h3>基本情報</h3>
        <TextField
          placeholder="お名前"
          label="お名前"
          type="text"
           autoFocus
          variant="outlined"  
          // value={name}
          defaultValue={initialName}
          // eventを書きます onChange
          // 記述6 event
          onChange={(e) => setName(e.target.value)}
        /> 

        <TextField
        label="フリガナ"
        placeholder="フリガナ"
        type="text"
         autoFocus
          variant="outlined"
        value={nametag}
        // eventを書きます onChange
        // 記述6 event
        onChange={(e) => setNametag(e.target.value)}
      /><br/>
   
         <TextField
        className=""
        placeholder="年齢"
        label="年齢"
        type="text"
         autoFocus
          variant="outlined"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
         <TextField
        className=""
        placeholder="居住地域（都道府県名）"
        label="居住地域"
        type="text"
         autoFocus
          variant="outlined"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
       <br/> 
       <h3>キャリアについて</h3>
       <p>直近の在籍企業について</p>
               <TextField
        className=""
        placeholder="社名1(直近在籍企業)"
        label="社名1(直近在籍企業)"
        type="text"
         autoFocus
          variant="outlined"
        value={c1name}
        onChange={(e) => setC1name(e.target.value)}
      />
               <TextField
        className=""
        placeholder="在籍期間1"
        label="在籍期間1"
        type="text"
         autoFocus
          variant="outlined"
        value={c1term}
        onChange={(e) => setC1term(e.target.value)}
      />

               <TextField
        className=""
        placeholder="役職階層１"
        label="役職階層１"
        type="text"
         autoFocus
          variant="outlined"
        value={c1position}
        onChange={(e) => setC1position(e.target.value)}
      />
             <br/>  
             
               <TextField 
                style={{
                  width: '82%',
                  maxWidth: '933px'
                            }}
        placeholder="職務内容1（課題・手段・成果）"
        label="職務内容1（課題・手段・成果）"
        multiline
          rows={4}
        type="text"
         autoFocus
          variant="outlined"
        value={c1job}
        onChange={(e) => setC1job(e.target.value)}
      />
<br/>  
      <p>過去の在籍企業について</p>
               <TextField
        className=""
        placeholder="社名2"
        label="社名2"
        type="text"
         autoFocus
          variant="outlined"
        value={c2name}
        onChange={(e) => setC2name(e.target.value)}
      />
               <TextField
        className=""
        placeholder="在籍期間2"
        label="在籍期間2"
        type="text"
         autoFocus
          variant="outlined"
        value={c2term}
        onChange={(e) => setC2term(e.target.value)}
      />

               <TextField
        className=""
        placeholder="役職階層2"
        label="役職階層2"
        type="text"
         autoFocus
          variant="outlined"
        value={c2position}
        onChange={(e) => setC2position(e.target.value)}
      />
             <br/>  
             
               <TextField
                style={{
                  width: '82%',
                  maxWidth: '933px'
                            }}
        placeholder="職務内容2（課題・手段・成果）"
        label="職務内容2（課題・手段・成果）"
        multiline
          rows={4}
        type="text"
         autoFocus
          variant="outlined"
        value={c2job}
        onChange={(e) => setC2job(e.target.value)}
      />

      <br/>  
               <TextField
                style={{
                  width: '82%',
                  maxWidth: '933px'
                            }}
        className=""
        placeholder="その他職務経歴記載蘭（3社以上の在籍の場合"
        label="その他職務経歴記載蘭（3社以上の在籍の場合"
        type="text"
         autoFocus
          variant="outlined"
        value={other}
        onChange={(e) => setOther(e.target.value)}
      />
      <br/>  
               {/* <TextField
        style={{
          width: '82%',
          maxWidth: '933px'
                    }}
        className=""
        placeholder="ご要望"
        type="text"
         autoFocus
          variant="outlined"
        value={demand}
        onChange={(e) => setDemand(e.target.value)}
      /> */}
              <br/>  
        {/* <IconButton>
          <label>
            <AddAPhotoIcon />
            <TextField type="file" onChange={onChangeImageHandler} />
          </label>
        </IconButton> */}
        <Button type="submit" disabled={!name}  autoFocus
          variant="outlined">
          送信
        </Button>
      </form>
      {/*  */}
    </div>
  );
};
export default TweetInput;