import React, {useState} from "react";//it is an object which consist of all react apis , for named import use {}
import { Link } from "react-router-dom";
import '../App.css' ;
export default function Authform({mode, onSubmit}){
    const [username , setUsername]=useState("");//it returns a array not a object
    const [password , setPassword]= useState("");


const handleSubmit=(e) => {
    e.preventDefault();
      
    onSubmit({ username, password });
  };

return (
  <div className="auth-container">
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 >
        {mode === 'login' ? 'Login' : 'Register'}
      </h2>
            <label className="auth-label">Username:</label>

         <input
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        required
        className="auth-input"
        />
              <label className="auth-label">Password:</label>

        <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        className="auth-input"
        
        />

        
        <button
        className="authbutton"
        type="submit"
        >
{mode ==="login" ? "login" :"register"} 
        </button>

        {mode==="login"?
          (
            <p>
              New user? <Link to="/register">Click here to register</Link>
            </p>
          ):(
            <p>
          Already have an account? <Link to="/">Click here to Login</Link>
            </p>
          )}  
    </form>
      </div>

);
}