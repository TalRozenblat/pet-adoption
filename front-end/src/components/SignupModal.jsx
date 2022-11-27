import React, { useState } from 'react';
import '../styles/SignupModal.css';
import closeSVG from '../images/close.svg';
import pass from '../images/pass.svg';
import checkPass from '../images/checkPass.png';
import emailPlane from '../images/emailPlane.png';
import phoneSVG from '../images/phone.svg';
import firstNameSVG from '../images/firstName.png';
import lastNameSVG from '../images/lastName.png';
// import { signup, login } from '../services/server';
// import useAuth from '../hooks/useAuth';





function SignupModal(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    // const { onLogin } = useAuth();

    
    const handleEmailChange = (event) => {

        setEmail(event.target.value);
    
    }
    const handlePhoneChange = (event) => {

        setPhone(event.target.value);
    
    }
    
    const handlePasswordChange = (event) => {

        setPassword(event.target.value);
    
    }

    const handleConfirmPasswordChange = (event) => {

        setConfirmPassword(event.target.value);
    
    }

    const handleFirstNameChange = (event) => {

        setFirstName(event.target.value);

    }
    const handleLastNameChange = (event) => {

        setLastName(event.target.value);

    }

    const handleSignup = async (event) => {
       
        // const newUser = await signup(email, password, confirmPassword, firstName, lastName, phone);
        // if(newUser){
        //     const user = await login(email, password);
        //     localStorage.activeUser = JSON.stringify(user);
        // // setActiveUser(user);
        // onLogin(email, password);
            
        // }

        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setPhone('');
       
        
        props.handleSignupModalClose();
    }

    
    return (
        <div className='signup-modal'>
            <div className='close-svg'>
                <button onClick={() => props.handleSignupModalClose()}>
                    <img role = "img" src = {closeSVG}/>
                </button>
            </div>
            <h2 className='signup-header'>Sign Up</h2>
            <h4 className='signup-h4'> Create a new account</h4>
         
                <div className = 'names-div'>
                    <label className=' names first-name'>
                        <img className = 'names-label' role = "img" src ={firstNameSVG}  />
                        <input className ='names' placeholder='First Name' value = {firstName} onChange = {handleFirstNameChange}/>
                    </label>
                    <label className=' names'>
                        <img className = 'names-label' role = "img" src ={lastNameSVG}  />
                        <input className ='names' placeholder='Last Name' value = {lastName} onChange = {handleLastNameChange}/>
                    </label>
                </div>

               
                <label className='login-label '>
                    <img role = "img" src ={emailPlane}  />
                    <input id = 'email' type = 'email' placeholder='Email' value = {email} onChange = {handleEmailChange}/>
                </label>

                
                <label className='login-label'>
                    <img role = "img" src ={phoneSVG}  />
                    <input className = 'phone' type = 'tel' placeholder='Phone Number' value = {phone} onChange = {handlePhoneChange}/>
                </label>
            
                <label className='login-label'>
                    <img role = "img" src = {pass}/>
                    <input value = {password} onChange={handlePasswordChange} placeholder = 'Password' type = 'password'/>
                </label>
                <label className='login-label'>
                    <img role = "img" src = {checkPass}/>
                    <input value = {confirmPassword} onChange={handleConfirmPasswordChange} placeholder = 'Confirm Password' type = 'password'/>
                </label>

                <div className='btn-container'>
                    <button className='login-btn' onClick={handleSignup}>Signup</button>
                </div>
        </div>
    );
}

export default SignupModal;