import attach from "../img/attach.png";
import img from "../img/img.png";
export default function Input() {
  return (
    <div className="input">
     <input type="text" placeholder="type ..text"></input>
    <div className="send">
     <img src={attach} alt=""/>
     <input type="file" id="file" style={{display:"none"}}/>
     <label htmlFor="file" >
      <img src={img} alt=""></img>
     </label>
     <button>send</button>
    </div>
    </div>
  )
}