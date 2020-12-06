import React from "react";
import "./sing-up.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewUser, currentUser } from "../../redux/usersStore";

function SingUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
    const userData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
    };
    dispatch(addNewUser(userData));
    dispatch(currentUser(userData));

    history.push("/home");
  };

  const onClickGoLogin = () => {
    history.push("/login");
  };

  return (
    <div className="container-sing-up">
      <h1 className="sing-up-title">Create Account</h1>
      <form className="sing-up-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-sing-up"
          placeholder="Full Name"
          name="fullName"
          ref={register({ required: true })}
        />
        {errors.fullName && "Full Name is required."}
        <input
          className="input-sing-up"
          placeholder="Email"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && "Email is required."}
        <input
          className="input-sing-up"
          placeholder="Password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && "Password is required."}
        <input
          className="input-sing-up"
          placeholder="Confirm Password"
          name="confirmPassword"
          ref={register({ required: true })}
        />
        {errors.confirmPassword && "Confirm Password is required."}
        <button className="button-submit-sing-up" type="submit">
          Submit
        </button>
      </form>
      <div className="container-button-sing-up">
        Do you already have an account?
        <button className="button-go-login" onClick={onClickGoLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default SingUp;
