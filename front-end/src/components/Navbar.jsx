import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'


function Navbar(props) {
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <ul>
                    <li><NavLink
                        to='/'
                        end
                        className={({ isActive }) => (isActive ? 'selected' : 'inactive')}
                    >
                        Home
                    </NavLink></li>
                    <li><NavLink to='/mypetspage' className={({ isActive }) => (isActive ? 'selected' : 'inactive')}>My Pets</NavLink></li>
                    <li><NavLink to='/profile' className={({ isActive }) => (isActive ? 'selected' : 'inactive')}>Profile</NavLink></li>
                    <li><NavLink to='/addpet' className={({ isActive }) => (isActive ? 'selected' : 'inactive')}>Add Pet</NavLink></li>
                    <li><NavLink to='/dashboard' className={({ isActive }) => (isActive ? 'selected' : 'inactive')}>Dashboard</NavLink></li>

                </ul>
            </nav>
        </div>
    );
}

export default Navbar;