import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterType } from "../shared/interfaces/user";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { register } from "../features/auth/authSlice";
import Alert from "../components/Alert";

export const Register = () => {
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const {error,user:userState}=useAppSelector(state=>state.auth)
  const [user, setUser] = useState<userRegisterType>({
    name: "",
    email: "",
    password: "",
  });
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(user))
  };
  useEffect(()=>{
    if(userState!=null){
      navigate('/home')
    }
  },[userState])
  return (
    <div className="container w-75 my-4">
      <h1>Register</h1>
      {error!=null && error.error && <Alert className='danger' message={error.error[0] }/>}
      {error!=null && error.password && <Alert className='danger' message={error.password[0] }/>}
      {error!=null && error.name && <Alert className='danger' message={error.name[0] }/>}
      {error!=null && error.email && <Alert className='danger' message={error.email[0] }/>}
      <form onSubmit={(e) => handleSumbit(e)}>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={(e)=>setUser({...user,name:e.target.value})}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e)=>setUser({...user,email:e.target.value})}
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
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2 mr-2">
          Sign up
        </button>
        <span className="mx-1">
          Don't you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
