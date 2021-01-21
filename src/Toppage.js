import React from 'react'
import { Link} from "react-router-dom";

const Toppage = () => {
    return (
        <div>
         <h2>
         人生100年時代。働き続ける必要性が高くなっているのに、<br/>
         働き続ける難易度がより高くなっている。<br/>
         だから支援する。<br/></h2>
         <a> 

         ・あなたが「どんな人」で「何ができるか」。本質的な自己理解をやり遂げること<br/>
         ・あなたの「資質とスキルが伝わる」最新の職務経歴書を作成すること<br/>
         ・あなたの資質と向き合い、納得感のある目標設定を支援すること<br/>
         その全てをコーチングを通じて支援します。
         <br/>
         <br/>

         <h2>Step1「どんな人」かを科学的に理解する</h2>
         <h3>ストレングスファインダーを使用したコーチング</h3>
         <a href="https://www.gallup.com/cliftonstrengths/ja/home.aspx" target="_blank"> 
         ストレングスファインダー
         </a>とは、自分の強みを発見し、<br/>
         成功するためにそれを活用するための方法を学ぶためのツールです。<br/>

         <h2>Step2「何ができるか」を客観的に整理する</h2>
         <h3>キャリアコンサルタントによる職務経歴の棚卸</h3>

         <h2>Step3「どんな人」で、「何ができるか」を形にする</h2>
         <h3>職務経歴書の作成支援</h3>



         コーチについて<br/>

       
         <a href="https://www.gallup.com/learning/certification/ja/10622824/profile.aspx" target="_blank">
            
          →すごいコーチ←

         </a>
         <br/>

         まずは話を聞いてみる

         <button><Link to="/booking">無料カウンセリングはこちら</Link></button>
         
         </a>


        </div>
    )
}

export default Toppage
