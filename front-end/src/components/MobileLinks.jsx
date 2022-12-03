import { useState } from "react";
import LoginSignupBtn from './LoginSignupBtn'
import "../styles/NavbarSlim.css";
import { NavLink, useNavigate } from 'react-router-dom';


const MobileLinks = ({ open }) => {
  return (
    <nav
      className={open ? 'mobileNavWrapperOpen' : 'mobileNavWrapper'}
    >
      {/* <div className={styles.mobileLinks}> */}
        <NavLink to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/mypetspage" activeClassName="active">
          My Pets
        </NavLink>
        <NavLink to="/searchPage" activeClassName="active">
          Look for Pets
        </NavLink>
        <NavLink to="/profile" activeClassName="active">
          Profile
        </NavLink>
        <NavLink to="/addPet" activeClassName="active">
          Add Pet
        </NavLink>
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
        {/* <NavLink to="/packages" activeClassName="active">
          Packages
        </NavLink> */}
        
        
      {/* </div> */}
      <LoginSignupBtn type = 'Login' />
    </nav>
  );
};

export default MobileLinks