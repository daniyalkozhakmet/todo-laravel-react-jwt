import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  let user: { name: string; email: string; token: string } | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: userState } = useAppSelector((state) => state.auth);
  //rerender
  useEffect(() => {}, [userState]);

  const handleLogout = () => {
    dispatch(logout(null));
    navigate('/home')
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          Alo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="w-25"></div>
          <form className="form-inline my-2 my-lg-0 d-flex w-75">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          {user ? (
            <>
              <span
                className="mx-2"
                role="button"
                onClick={() => handleLogout()}
              >
                Logout
              </span>
            </>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Login
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                  <Link className="dropdown-item" to="/register">
                    Register
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
