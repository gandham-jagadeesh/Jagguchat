import add from "../img/add.png";
import cam from "../img/cam.png";
import more  from "../img/more.png";
import Messages from "./Messages.js"
import Input from "./Input.js";
export default function Chat(){
    return (
        <div className="chat">
           <div className="chatInfo">
           <span>jane</span>
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