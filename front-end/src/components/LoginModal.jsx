import React, { useState } from 'react';
import '../styles/LoginModal.css';
import usernameSVG from '../images/username.svg';
import passwordSVG from '../images/password.svg';
import closeSVG from '../images/close.svg';
// import { login } from '../services/server';
// import useAuth from '../hooks/useAuth';

// import AuthProvider from './AuthProvider';


function LoginModal(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { onLogin } = useAuth();


    const handleEmailChange = (event) => {

        setEmail(event.target.value);
    
    }
    
    const handlePasswordChange = (event) => {

        setPassword(event.target.value);
    
    }

    const handleLogin = async (event) => {

        
        // onLogin(email, password);
        setEmail('');
        setPassword('')
        props.handleLoginModalClose();
    }

    return (
        <div className='login-modal'>
            <div className='close-svg'>
                <button onClick={() => props.handleLoginModalClose()}>
                    <img role = "img" src = {closeSVG}/>
                </button>
            </div>
            <h2 className='login-header'>Login</h2>
            <h4 className='login-h4'> Sign in to your account</h4>
            {/* <div className = 'login-label'>
                    <label name = 'email' id = 'email-label-login'>Email:</label>
                </div> */}
                <label className='login-label'>
                    <img role = "img" src ={usernameSVG}  />
                    <input placeholder='Email' value = {email} onChange = {handleEmailChange}/>
                </label>

                {/* <div className = 'label'>
                    <label name = 'password' id = 'password-label-login'>Password:</label>
                </div> */}
                <label className='login-label'>
                    <img role = "img" src = {passwordSVG}/>
                    <input value = {password} onChange={handlePasswordChange} placeholder = 'Password' type = 'password'/>
                </label>
                <div className='btn-container'>
                    <button className='login-btn' onClick={handleLogin}>Login</button>
                </div>
        </div>
    );
}

export default LoginModal;