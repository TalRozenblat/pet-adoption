import React from 'react';

function HomepageHeader(props) {
    return (
        <div className='homepage-header'>
            {props.currentUser
            ? <div className='logged-in'>
                <h1>{`${props.currentUser.firstName} ` + `${props.currentUser.lastName}`} ,Welcome to Pet A Pet!</h1>

            </div>

            : <div className='logged-out'>
                <h1>Welcome to Pet A Pet!</h1>
                <p>Pet A Pet is you local friendly pet shelter, offering you the option to adopt your best new friend!</p>
                <p>The proccess is easy! Just sign up and explore our lovely friends!</p>
            </div>
            }
            

            
        </div>
    );
}

export default HomepageHeader;