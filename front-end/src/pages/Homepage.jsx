import React, { useState, useEffect } from 'react';
import Homepageheader from '../components/HomepageHeader';
import LoginSignupBtn from '../components/LoginSignupBtn';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

// import { useState,useEffect } from 'react';


function Homepage(props) {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    // const currentUser = false;
    const currentUser = {
        firstName: 'Tal',
        lastName: 'Rozenblat'
    }
    const navigate = useNavigate();

    const handleLoginModalClick = () => {

        // setModalNoteId(notes.findIndex(note => note.id === id));
        setLoginModalIsOpen(true);
    }

    const handleLoginModalClose = () => {
        setLoginModalIsOpen(false);
    }

    const handleSignupModalClick = () => {

        // setModalNoteId(notes.findIndex(note => note.id === id));
        setSignupModalIsOpen(true);
    }

    const handleSignupModalClose = () => {
        setSignupModalIsOpen(false);

    }

    return (
        <div>
           
            <div className='homepage'>
                {currentUser
                    
                    ? <div className='logged-in'>

                        <Homepageheader currentUser={currentUser} />
                        <button className='btn' onClick={() => navigate('/searchPage')}>Search Page</button>
                        <button className='btn' onClick={() => navigate('/myPetsPage')}>My Pets</button>


                    </div>

                    : <div className='logged-out'>
                       <Homepageheader currentUser={currentUser ? true : false} />
                        <LoginSignupBtn type='Login' func={(e) => handleLoginModalClick(true)} />
                        <LoginSignupBtn type='Signup' func={(e) => handleSignupModalClick(true)} />
                        <Modal className='modal' isOpen={loginModalIsOpen} onRequestClose={() => setLoginModalIsOpen(false)}>
                            <LoginModal handleLoginModalClose={handleLoginModalClose} />
                        </Modal>
                        <Modal className='modal' isOpen={signupModalIsOpen} onRequestClose={() => setSignupModalIsOpen(false)}>
                            <SignupModal handleSignupModalClose={handleSignupModalClose} />
                        </Modal>
                    </div>

                }
            </div>
        </div>
    );
}

export default Homepage;