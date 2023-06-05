export const  Login = ()=>{
    return (
        <div className="formContainer">
            <div className="formWrapper">
             <span className="logo">gandham Chat Application</span>
             <span className="title">login</span>
             <form>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button>login in</button>
             </form>
             <p>you don't have account register</p>
            </div>
        </div>
    )
}