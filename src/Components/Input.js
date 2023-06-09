import { useContext, useState } from "react";
import attach from "../img/attach.png";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import {v4 as uuid} from "uuid";
import { ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseconfig";
import { arrayUnion, updateDoc,doc, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseconfig";


export default function Input() {
  const [text,setText] = useState("");
  const [img,sentImg]  = useState(null);
  const {data} = useContext(ChatContext);
  const {currentUser} = useContext(AuthContext);

  const HandleSend = async ()=>{
      if(img){
        const storageRef = ref(storage,uuid());
        await uploadBytesResumable(storageRef,img);
        const photoUrl   = await getDownloadURL(storageRef);
      try{
        await updateDoc(doc(db,"chats",data.chatId),{
          messsages: arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.uid,
            date:Timestamp.now(),
            img:photoUrl
          })})  
      }
      catch(e){
        console.log(e);
      }

}

        else{
          await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
              id:uuid(),
              text,
              senderId:currentUser.uid,
              date:Timestamp.now()
            })

          })
        }

          await updateDoc(doc(db,"userChats",data.user.uid),{
          [data.chatId + ".lastMessage"]:{
          text,
          },
          [data.chatId+".date"]:serverTimestamp()
  
        })
  
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [data.chatId + ".lastMessage"]:{
          text,
          },
          [data.chatId+".date"]:serverTimestamp()
  
        })
  

      setText("");
      sentImg(null);
  }
  return (
    <div className="input">
     <input type="text" placeholder="type ..text" onChange={(e)=>{setText(e.target.value)}} value={text}></input>
    <div className="send">
     <img src={attach} alt=""/>
     <input type="file" id="file" style={{display:"none"}} onChange={(e)=>{sentImg(e.target.files[0])}}/>
     <label htmlFor="file" >
      <img src={img} alt=""></img>
     </label>
     <button onClick={HandleSend}>send</button>
    </div>
    </div>
  )
}