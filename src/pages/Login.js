import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseconfig";
import {signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export const  Login = ()=>{
    const [err,seterr] = useState(false);
    const navigate = useNavigate();

    const LoginHandler = async(e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password=e.target[1].value;

        try{
           await  signInWithEmailAndPassword(auth,email,password);
           navigate("/");
        }
        catch(e){
            console.log(e);
            seterr(true);
        }

    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
             <span className="logo">gandham Chat Application</span>
             <span className="title">login</span>
             <form onSubmit={LoginHandler}>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button>login in</button>
                {(err && <p>try again</p>)}
             </form>
             <Link to="/register">you don't have account register</Link>
            </div>
        </div>
    )
}