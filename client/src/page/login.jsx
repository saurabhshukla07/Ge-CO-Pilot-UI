import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grant } from "../assets";
import { LoginComponent } from "../components";
import { setLoading } from "../redux/loading";
import "./style.scss";
import { IoIosLogIn } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";


const Login = () => {
  const location = useLocation();

  const [auth, setAuth] = useState(false);
  const[mode, setMode] = useState(false)

  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (location?.pathname === "/login/auth") {
        setAuth(true);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      } else {
        setAuth(false);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      }
    }
  }, [location]);

  const darkMode = ()=>setMode(prevMode => !prevMode)
// 

  return (
    <div className="Auth" >
     
        <div className="inner">
        {auth ? (
          <LoginComponent />
        ) : (
        
          <div className={mode===true?"wrapper":"suggection"}>
             {/* <div className="wrapper"> */}
              <div className="navbar" onClick={darkMode}><MdOutlineDarkMode /></div>

            <div className={mode===true?"dark-login-wrapper":"login-wrapper"}>
            <div className="logo">
              <Grant />
            </div>

            <div className="login-text">
              <h1>Welcome to GE CoPilot™</h1>
              <p>Log in or Sign up with your account to continue</p>
            </div>

            <div className="btns">
              <button
                onClick={() => {
                  navigate("/login/auth");
                }}
              >
              <span className="btn-icon">   Log in<IoIosLogIn /></span>
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
              >
           <span className="btn-icon">     Sign up <IoMdPersonAdd />
           </span>

              </button>
            </div>
            </div>
            </div>
          
            // </div>
        )}

       </div>
    
    </div>
  );
};

export default Login;
