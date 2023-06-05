import Add from "../img/addAvatar.png";
export const Register = ()=>{
    return (
        <div className="formContainer">
            <div className="formWrapper">
             <span className="logo">gandham Chat Application</span>
             <span className="title">Register</span>
             <form>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <input type="file" id="file"/>
                <label  htmlFor="file">
                    <img src={Add} alt=""></img>
                    <span>add an avatar</span>
                </label>
                <button>sign up</button>
             </form>
             <p>you don't have account login</p>
            </div>
        </div>
    )
}