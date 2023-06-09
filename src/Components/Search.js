import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { db } from '../config/firebaseconfig';
import { AuthContext } from '../context/AuthContext';


export const Search = () => {
  const [username,setUserName] = useState("");
  const [err,setErr]  = useState(false);
  const [user,setUser] = useState("");
  const {currentUser} = useContext(AuthContext);

  const handleKey = (e)=>{
    e.code  === "Enter" && handleSearch();
  }

const handleSelect = async ()=>{
  const combinedId = currentUser.uid > user.id ? 
                     currentUser.uid+user.uid :
                     user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db,"chats",combinedId));

      if(!res.exists()){

        await setDoc(doc(db,"chats",combinedId),{messages:[]});
      
        try{
          await updateDoc(doc(db,"userChats",user.uid),{
            [combinedId+".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL,
            },
            [combinedId+".date"]:serverTimestamp(),
          });
    
          await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combinedId+".userInfo"]:{
              uid:user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL,
            },
            [combinedId+".date"]:serverTimestamp(),
          });


        }
        catch(e){
        console.log(e,"upading is wrong");  
        }
    

 }}catch(e){
  console.log(e);
 }

 setUserName("");
 setUser(null);
}


 const handleSearch = async ()=>{
  const q = query(collection(db,"users"),where("displayName","==",username));
  try{
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
  })
  }
   
  catch(err){
    setErr(true);
  }


}


  return (
    <div className='chats'> 
    <div className='search'>
    <div className='searchForm'>
     <input type='text' placeholder='find user' onKeyDown={handleKey} onChange={(e)=>{setUserName(e.target.value)}} value={username}/>
    </div>
    {
      err && <span>some thing went wrong</span>
    }

    {user && 
    <div className='userChat' onClick={handleSelect}>
    <img src={user.photoURL} alt='bomma'></img>
    <div className='userChatInfo'>
      <span>{user.displayName}</span>
    </div>
  </div>
  }


    </div>
    </div>
  )
}
