import React from 'react';
import Homepageheader from '../components/HomepageHeader';
import LoginSignupBtn from '../components/LoginSignupBtn';
import { useState,useEffect } from 'react';

const currentUser = false;

function Homepage(props) {
    const [loginModalOpen, setLoginModalOpen] = useState(false);
    const [signupModalOpen, setSignupModalOpen] = useState(false);

    

    return (
        <div>
           <h1>Homepage</h1> 
           <Homepageheader type = {currentUser ?  'logged-in' : 'not-logged-in'}/>
            {currentUser ? 
                ''
            : <div> <LoginSignupBtn type = 'Login' func = {(e) => setLoginModalOpen(true)}/>
            <LoginSignupBtn type = 'Signup' func = {(e) => setSignupModalOpen(true)}/>
            </div>
            }
        </div>
    );
}

export default Homepage;