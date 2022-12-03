import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getPets, getLikedPetsByUserId } from '../services/server.js'
import Card from '../components/Card.jsx';
import '../styles/MyPetsPage.css';

function MyPetsPage(props) {

    const [pets, setPets] = useState([]);
    const [likedPets, setLikedPets] = useState([]);

    const currentUser = {
        id:1,
        name:'tal',
    }


    const petsArray = [
        {
            id:'1',
            name:'Yuki',
            type: 'dog',
            status: 'available'
        },
        {
            id:'2',
            name:'Mars',
            type: 'dog',
            status: 'fostered'
        },
        {
            id:'3',
            name:'Kim',
            type: 'dog',
            status: 'adopted'
        }
    ]
    useEffect(() => {
        const loadData = async () =>{
            const petsArrayFromDB = await getPets(); 
            const likedPetsArrayFromDb = await getLikedPetsByUserId(currentUser.id);
            setPets(petsArrayFromDB);
            setLikedPets(likedPetsArrayFromDb);
        }

    }, [])



    return (
        <div className='my-pets-page'>
            <div className='title'>My Pets</div>
            <div className = 'pet-cards'>
            {petsArray.map((pets => <Card card = {pets} />))}
            </div>
        </div>
    );
}

export default MyPetsPage;