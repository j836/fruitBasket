import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loginUserWithCredentials } = useAuth();
  const [status, setStatus] = useState("idle");

  const [userLoginDetails, setUserLoginDetails] = useState({
    username: "",
    password: ""
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  const checkCredentials = async () => {
    setStatus("loading");

    (await loginUserWithCredentials(userLoginDetails))
      ? setStatus("idle")
      : setStatus("error");
    if (state?.from) {
      navigate(`${state.from}`);
    } //else navigate("/store");
  };
  const LoginHandler = (e) => {
    e.preventDefault();
    checkCredentials();
  };

  return (
    <>
      {status === "error" && (
        <div className="red d-flex jc-center ai-center">
          <img
            src="https://icon-library.com/images/error-icon-transparent/error-icon-transparent-24.jpg"
            alt=""
            height="25px"
            width="25px"
          />
          <p className="ml-medium">{"Invalid Username or Password"}</p>
        </div>
      )}
      <form onSubmit={(e) => LoginHandler(e)} className="form">
        <div className="form-container">
          <div className="form-title header header-secondary text-center">
            sign in
          </div>
          <div className="form-row">
            <input
              type="text"
              className="input input-email"
              id="username"
              onChange={(event) =>
                setUserLoginDetails((prevState) => ({
                  ...prevState,
                  username: event.target.value
                }))
              }
              required
            />
            <label htmlFor="username" className="label-name">
              <span className="content-name">username</span>
            </label>
          </div>
          <div className="form-row">
             
            <input
              type="password"
              className="input input-password"
              id="password"
              onChange={(event) =>
                setUserLoginDetails((prevState) => ({
                  ...prevState,
                  password: event.target.value
                }))
              }
              required
            />
             
            <label htmlFor="password" className="label-name">
               <span className="content-name">password</span>
            </label>
          </div>
          <button className="btn btn-primary btn-input">
            {}
            {status === "loading" ? (
              <>
                <img
                  src="https://www.circuit-booking.com/themes/basic/assets/images/dot-progress.gif"
                  alt="loading"
                  width="50px"
                  height="12px"
                />
              </>
            ) : (
              "login"
            )}
          </button>
        </div>
      </form>
      <Link to="/signup">
        <div>
          Not Registered yet?<button className="btn btn-primary">Signup</button>
        </div>
      </Link>
    </>
  );
};

export { Login };
