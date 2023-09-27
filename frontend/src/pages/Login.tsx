import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { userLoginType } from "../shared/interfaces/user";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "../features/auth/authSlice";
import useLocalStorage from "../hooks/useLocalStorage";
import Alert from "../components/Alert";
export const Login = () => {
  const dispatch = useAppDispatch();
  const {error,user:userState}=useAppSelector(state=>state.auth)
  // const [theme, setTheme] = useLocalStorage("user", "");
  const navigate=useNavigate()
  const [user, setUser] = useState<userLoginType>({
    email: "",
    password: "",
  });
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(user))

  };
  useEffect(()=>{
    if(userState!=null){
      navigate('/home')
    }
  },[userState])
  return (
    <div className="container w-75 my-4">
      <h1>Login</h1>
      {error!=null && error.error && <Alert className='danger' message={error.error[0] }/>}
      {error!=null && error.password && <Alert className='danger' message={error.password[0] }/>}
      <form onSubmit={(e) => handleSumbit(e)}>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2 mr-2">
          Sign in
        </button>
        <span className="mx-1">
          Already have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};
