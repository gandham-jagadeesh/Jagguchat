import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from "../config/firebaseconfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Register = ()=>{
    const [err,setErr] = useState(false);
    const navigate     = useNavigate();
    const registerHandler = async (e)=>{    
        e.preventDefault();
        const displayName = e.target[0].value;
        const email       = e.target[1].value;
        const password    = e.target[2].value;
        const file      = e.target[3].files[0];

        try{
        const response   = await createUserWithEmailAndPassword(auth,email,password);
        const date       = new Date().getTime();
        const storageRef = ref(storage,`${displayName + date}`);
        await  uploadBytesResumable(storageRef,file);
        const photoUrl   = await getDownloadURL(storageRef);
       await updateProfile(response.user,{displayName,photoURL:photoUrl});
       await setDoc(doc(db,"users",response.user.uid),{uid:response.user.uid,displayName,email,photoURL:photoUrl}); 
       await setDoc(doc(db,"userChats",response.user.uid),{});
        navigate("/");
    }
        
catch(e){
    console.error(e);
    setErr(true);
}
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
             <span className="logo">gandham Chat Application</span>
             <span className="title">Register</span>
             <form onSubmit={registerHandler}>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <input type="file" id="file"/>
                <label  htmlFor="file">
                    <img src={Add} alt=""></img>
                    <span>add an avatar</span>
                </label>
                <button>sign up</button>
                {(err && <p>some things gone wrong</p>)}
             </form>
             <Link to="/login">you  have account login</Link>
            </div>
        </div>
    )
}