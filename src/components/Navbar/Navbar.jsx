import React from "react";
import { Link } from "react-router-dom";
import logo from "../../ assets/freshcart-logo.svg";
import "./Navbar.css";
import { Cartcontext } from "../../Contexts/Cartcontext";
import { useContext } from "react";
export default function Navbar({ userData, logout }) {
  let { numOfCartItems } = useContext(Cartcontext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="">
          <img src={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData && (
            <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="products">
                  products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="cart">
                  cart
                  <span className="badge bg-main text-white">
                    {numOfCartItems}
                  </span>
                </Link>
              </li>
            </ul>
          )}

          {userData ? (
            <li className="nav-item">
              <span className="navbar-brand cursor-pointer" onClick={logout}>
                logout
              </span>
            </li>
          ) : (
            <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to="login">
                  login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="register">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
