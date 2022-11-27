import "../styles/NavbarSlim.css";
import LoginSignupBtn from "./LoginSignupBtn.jsx";
// import Logo from '../images/logoNoBackground.svg';
import logo from '../images/logoNoBackground.png';
import { useState } from "react";
import MobileLinks from './MobileLinks';
import { NavLink, useNavigate } from 'react-router-dom';


const NavbarSlim = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const handleOpenMobile = () => {
        setMobileNavOpen(!mobileNavOpen);
    }
  return (
    <div>
      <header className='navigationWrapper'>
        <div className='navigationHeader'>
          <span className='navigationNames'>
            
            <NavLink to={"/"}>

                <img className = 'logo' src={logo} alt="logo" />
            </NavLink>
          </span>
          <span className='navigationLinks'>
            <button
              className={mobileNavOpen ? 'mobileMenuOpen' : 'mobileMenu'}
              onClick={handleOpenMobile}
            >
              <div className='bar1'></div>
              <div className='bar2'></div>
              <div className='bar3'></div>
            </button>
          </span>

          <nav className = 'webNav'>
            
                    <ul className='nav_links'>
                        {/* <li><Link href="/"> Home</Link></li> */}
                        <li><NavLink to="/myPets"> My Pets</NavLink></li>
                        <li><NavLink to="/profile"> Profile</NavLink></li>
                        <li><NavLink to="/addPet"> Add Pet</NavLink></li>
                        <li><NavLink to="/dashboard"> Dashboard</NavLink></li>
                        {/* <li><Link href="/packages"> Packages</Link></li> */}
                        {/* <li><Link href="/documentation"> Documentation</Link></li> */}

                        <li><LoginSignupBtn type = 'Login' /></li>
                    </ul>

                </nav>
        </div>
      </header>
      <MobileLinks open = {mobileNavOpen}/>
    </div>
  );
};

export default NavbarSlim;
