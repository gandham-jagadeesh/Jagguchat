import add from "../img/add.png";
import cam from "../img/cam.png";
import more  from "../img/more.png";
import Messages from "./Messages.js"
import Input from "./Input.js";
import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
export default function Chat(){
    const {data} = useContext(ChatContext);
    return (
        <div className="chat">
           <div className="chatInfo">
           <span>{data.user?.displayName}</span>
           <div className="chatIcons">
              <img src={add} alt=""></img>
              <img src={cam} alt=""></img>
              <img src={more} alt=""></img>
           </div>
           </div>
           <Messages/>
           <Input /> 
           </div>
        
    )
}