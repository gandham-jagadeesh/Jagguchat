import { useContext, useEffect } from "react"
import Message from "./Message"
import { ChatContext } from "../context/chatContext"
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebaseconfig";


export default function Messages(){
   const {data} = useContext(ChatContext);

   const [messages,setMessages] = useState([]);
   
      useEffect(()=>{
      const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{

         doc.exists() && setMessages(doc.data().messages);
      })
      return ()=>{
         unsub()
      }

   },[data.chatId])
 return (
    <div className="messages">
    { messages.map((m)=>(
         <Message message={m} key={m.id} />
      ))
    }


    </div>
 )
}