import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { auth } from '../config/firebaseconfig';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {

  const {currentUser} = useContext(AuthContext);
  
  return (
    <div className='navbar'>
    <span className='logo'>jaggu chat</span>
    <div className='user'>
      <img src={currentUser?.photoURL} alt='bomma'></img>
      <span>{currentUser?.displayName}</span>
      <button onClick={()=>signOut(auth)}>logout</button>
    </div>
    </div>
  )
}
