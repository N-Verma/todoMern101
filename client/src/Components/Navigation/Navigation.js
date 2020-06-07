import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser, faEdit } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.css";

const Navigations = (props) => {
  return (
    <div className={classes.Navbar}>
      <div className={classes.Brand}>
        <NavLink className={classes.Brand} to="/" exact>
          <FontAwesomeIcon icon={faEdit} size="1.5x" /> ToDo
        </NavLink>
      </div>
      <div className={classes.Links}>
        <NavLink to="/Login" exact className={classes.Link}>
          <FontAwesomeIcon icon={faSignInAlt} size="1.5x" /> Login
        </NavLink>
        <NavLink to="/Signup" exact className={classes.Link}>
          <FontAwesomeIcon icon={faUser} size="1.5x" /> SignUp
        </NavLink>
      </div>
    </div>
  );
};

export default Navigations;
