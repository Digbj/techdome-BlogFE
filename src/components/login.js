import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
// import { Link } from "react-router-dom";
// import Register from "./regis";
const Login = () => {

const {setInfo}=useContext(UserContext);

  //login
  const [on, setOn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect,setRedirect]=useState(false)

  //registration
  const [rname, setRname] = useState("");
  const [remail, setRemail] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [msg, setmsg] = useState("");


  //login logic
  const SubmitL =async (e) => {
    if (email === "" || password === "") {
      setmsg("Fill the credential");
    } else {
      e.preventDefault();
      const response= await fetch('http://localhost:8000/login',{
           method:'POST',
           body:JSON.stringify({email,password}),
           headers:{'Content-Type':'application/json'},
           //including the cookies in req header
           credentials:'include'
         });
         setmsg("");
      setEmail("");
      setPassword("");
     
      console.log(email, password);
   
         if(response.status===200){
          response.json().then(userInfo=>{
setInfo(userInfo)
setRedirect(true);
          })
         
          
           setmsg("Login Sucessful");
         }else{
           setmsg("Wrong Cradential");
         }
     
    }
  };



  //registration logic
  const SubmitR = async (e) => {
    if (rname === "" || remail === "" || rpassword === "") {
      setmsg("Fill the credential");
    } else {
      e.preventDefault();
   const response= await fetch('http://localhost:8000/reg',{
        method:'POST',
        body:JSON.stringify({rname,remail,rpassword}),
        headers:{'Content-Type':'application/json'}
      });
      setmsg("");
      setRname("");
      setRemail("");
      setRpassword("");
      console.log(rname, remail, rpassword);

      if(response.status===200){
        setmsg("Registration Sucessful");
      }else{
        setmsg("Registartion Failed");
      }
    }
  };

//redirecting to profile page or home page if credential are matched;
if(redirect){
  return <Navigate to='/blog'/>
}

  return (
    <>
      {on ? (
        <div className="login">
          <h3>Login</h3>
          <div className="login1">
            <div className="N1">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="N1">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <button className="log" onClick={SubmitL}>
              Login
            </button>
          </div>
          <p className="new1">
            New User
            <span
              onClick={() => {
                setOn(false);
              }}
              id="clk"
            >
              {" "}
              'Register Here'
            </span>
          </p>
          <p className="new2">{msg}</p>
        </div>
      ) : (
        <div className="login">
          <h3>Registration</h3>
          <div className="login1">
            <div className="N1">
              <label>Name</label>
              <input
                placeholder="Enter your Name"
                onChange={(e) => {
                  setRname(e.target.value);
                }}
                value={rname}
              />
            </div>
            <div className="N1">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                onChange={(e) => {
                  setRemail(e.target.value);
                }}
                value={remail}
              />
            </div>
            <div className="N1">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setRpassword(e.target.value);
                }}
                value={rpassword}
              />
            </div>
            <button className="log" onClick={SubmitR}>
              Register
            </button>
          </div>
          <p className="new1">
            Already Register{" "}
            <span
              id="clk"
              onClick={() => {
                setOn(true);
              }}
            >
              {" "}
              'Login'
            </span>
          </p>
          <p className="new2">{msg}</p>
        </div>
      )}
    </>
  );
};
export default Login;
