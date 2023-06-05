import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";

 const Message = ({message}) => {
 const {currentUser} = useContext(AuthContext);
 const {data}        = useContext(ChatContext);
 const ref = useRef();

  useEffect(()=>{
    ref.current.scrollIntoView({behaviour:"smooth"});
    console.log(message);
  },[message])

  return (
    <div ref={ref} className={`message ${message?.senderId === currentUser.uid && "owner"}`} >
    <div className="messageInfo">
      <img src={message?.senderId === currentUser.uid ? currentUser.photoURL : data.user.uid} alt=""></img>
      <span>just now</span>
    </div>
    <div className="messageContent">
  {message?.img && <img src={message?.img} alt=""></img>}
    <p>{message?.text}</p>
    </div>
    </div>
  )


}

export default  Message;