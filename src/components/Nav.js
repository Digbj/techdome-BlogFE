import React, { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const { setInfo, info } = useContext(UserContext);
  const user = info?.name;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/myprofile", { credentials: "include" });
          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }
          const userInfo = await response.json();
          setInfo(userInfo);
        } catch (error) {
          console.error(error);
        }
      };
  
      if (info) {
        fetchData();
      }
    }, []);
  

 

  // Logout
  const logout = () => {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    setInfo(null);
  };

  if (info === null) {
    return <Navigate to="/" />;
  }

  return (
    <div className="nav">
      <div className="nav1">
        <Link to="/">
          <h3 className="nav11">Digit Blog</h3>
        </Link>
      </div>

      <div className="nav2">
        {user ? (
          <>
            <Link to="blog">
              <li to="login" className="ho">
                Blog
              </li>
            </Link>
            <Link to="/createBlog">
              <li className="ho">Create Blog</li>
            </Link>
            <li className="ho" onClick={logout}>
              Logout
            </li>
          </>
        ) : (
          <>
            <Link to="blog">
              <li to="login" className="ho">
                Blog
              </li>
            </Link>
            <Link to="login">
              <li className="ho">Sign in/Sign Up</li>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
