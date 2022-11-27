import React from 'react';
import '../styles/LoginSignupBtn.css';
function LoginSignupBtn(props) {
   
    return (
        <div className='container'>
            <button  onClick = {props.func} >{props.type}</button>
            
        </div>
    );
}

export default LoginSignupBtn;