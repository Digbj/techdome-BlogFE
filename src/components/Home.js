import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <div className="title">
        <p id="title1">
          Welcome to the <span id="title2">Digit Blog</span>
        </p>
   <Link to='login'    > <button className="log">Login</button></Link>
      </div>
    </div>
  );
};
export default Home;
