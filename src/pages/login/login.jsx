import React, { useState } from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { currentUser } from "../../redux/usersStore";

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.users.users);
  console.log("userData", userData);
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(currentUser(data));

    // fetch(url, options)
    //   .then(res => res.json())
    //   .then((response) => {
    //     setLoading(false);
    //     console.log("Correct!");
    //     history.push("/home");
    //   })
    //   .catch((err) => {
    //       setLoading(false);
    //       alert("Incorrect email or password");
    //   })

    setTimeout(() => {
      setLoading(false);
      console.log("Correct!");
      history.push("/home");
    }, 2000);
  };

  const onClickGoSingUp = () => {
    history.push("/sing-up");
  };

  return (
    <div className="container-login">
      <h1 className="login-title">Login</h1>
      <div className="login-text">Please sing in to continue.</div>
      {loading ? (
        "Loading"
      ) : (
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="input-login"
            placeholder="Email"
            name="email"
            ref={register}
          />
          <input
            className="input-login"
            placeholder="Password"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          {errors.password && "Password is required."}
          <button className="button-submit-login" type="submit">
            Submit
          </button>
        </form>
      )}
      <div className="container-button-sing-up">
        Don´t have an account?
        <button className="button-go-sing-up" onClick={onClickGoSingUp}>
          Sing up
        </button>
      </div>
    </div>
  );
}

export default Login;
