import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { doc,onSnapshot } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { ChatContext } from "../context/chatContext";
export const Chats = () => {
  const {currentUser} = useContext(AuthContext);
  const [chats,setChats] = useState([]);
  const {dispatch} = useContext(ChatContext);


  useEffect(()=>{
    const getChats = ()=>{
      const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc)=>{
        setChats(doc.data());
      })
      return ()=>{
        unsub();
      }
    }
    currentUser.uid && getChats();

  },[currentUser.uid])

  
const handleSelect = (u)=>{
  console.log(u);
  dispatch({type:"CHANGE_USER",payload:u})
}



return (

    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>(b[1].date - a[1].date)).map((chat)=>(
      <div className='userChat' key={chat[0]} onClick={()=>{handleSelect(chat[1].userInfo)}}>
    <img src={chat[1].userInfo?.photoURL} alt='bomma'></img>
    <div className='userChatInfo'>
      <span>{chat[1].userInfo?.displayName}</span>
      <p>{chat[1].lastMessage?.text}</p>
    </div>
  </div>
  ))}
</div>

)}
