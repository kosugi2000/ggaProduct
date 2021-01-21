// 表示するためだけのファイル
import React from 'react';
import "./styles.css";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { db } from "./firebase";
import "./styles.css";
// 表示される順番をuseEffectで制御する。データベースからデータとるときは必須

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width:"40%",
      maxWidth : "300px",
    },
  },
}));

//削除ボタンの実装
const DeleteInputData = (id) => {
  db.collection("posts").doc(id).delete();
  console.log('削除が実行されました！', id);
};

//データがきますよ＝props
const Post = ({
  name,
  nametag,
  age,
  region,
  c1name,
  c1term,
  c1position,
  c1job,
  c2name,
  c2term,
  c2position,
  c2job,
  other,
  demand,
  image,
  uid,timestamp,id
}) => {
  //スタイル
const classes = useStyles();

    return (
        <div>
                    
           
     <div>

            {/* 画像があるときだけ表示 */}
      
            {/* {image ? (
        <div>
          <img src={image} alt="" className="insta"/>
        </div>
      ) : (
        <div>
        <img src={ImgPath1} alt="" className="insta" />
        </div>
      )} */}
     
            {/* テキスト情報 */}
<div className={classes.root}>
<h3>基本情報</h3>
<TextField
          placeholder="お名前"
          label="お名前"
          type="text"
          autoFocus
          value={name}
          variant="outlined"
        /> 
      
        <TextField
        label="フリガナ"
        placeholder="フリガナ"
        type="text"
        autoFocus
        value={nametag}
        variant="outlined"
      />
      <br/>      
         <TextField
        className=""
        placeholder="年齢"
        label="年齢"
        type="text"
        autoFocus
        value={age}variant="outlined"
      />
         <TextField
        className=""
        placeholder="居住地域（都道府県名）"
        label="居住地域"
        type="text"
        autoFocus
        value={region}
        variant="outlined"
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
        value={c1name}
        variant="outlined"
      />
               <TextField
        className=""
        placeholder="在籍期間1"
        label="在籍期間1"
        type="text"
        autoFocus
        value={c1term}
        variant="outlined"
      />

               <TextField
        className=""
        placeholder="役職階層１"
        label="役職階層１"
        type="text"
        autoFocus
        value={c1position}
        variant="outlined"
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
        value={c1job}
        variant="outlined"
      />
<br/>  
      <p>過去の在籍企業について</p>
               <TextField
        className=""
        placeholder="社名2"
        label="社名2"
        type="text"
        autoFocus
        value={c2name}
        variant="outlined"
      />
               <TextField
        className=""
        placeholder="在籍期間2"
        label="在籍期間2"
        type="text"
        autoFocus
        value={c2term}
        variant="outlined"
      />

               <TextField
        className=""
        placeholder="役職階層2"
        label="役職階層2"
        type="text"
        autoFocus
        value={c2position}
        variant="outlined"
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
        value={c2job}
        variant="outlined"
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
        value={other}
        variant="outlined"
      />


            {/* 日付を表示！ｊｓの形式 */}
              <div>
                最終更新日時：{new Date(timestamp?.toDate()).toLocaleString()}
                {/* <button onClick={() => DeleteInputData(id)}><ClearIcon /></button> */}
                </div>
              </div>
         </div>
       </div>
    )
}

export default Post

