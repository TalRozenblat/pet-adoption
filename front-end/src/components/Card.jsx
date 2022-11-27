import React from 'react';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { savePet, deletePet } from '../services/server';


function Card(props) {
    const { activeUser } = useAuth();
    const navigate = useNavigate;
    
    const handleSeeMore = () => {
        navigate(`/petPage/${props.card.id}`)
    }

    const handleSavePet = async  () =>{
        const response = await savePet(activeUser.id, props.card.id)
    }

    const handleDeletePet = async () =>{
        const response = await deletePet(activeUser.id, props.card.id)
        console.log(response);

    }

    return (
        <div className='card'>
            <img className="card-image" src={props.card.picture} alt='pet'  />

            <div className="card-header">
               
                
                    <h5 className="card-title">{props.card.name}</h5>
                   
                
                <div className="card-text">{props.card.bio}</div>

                <p>Status: {props.card.status}</p>
                <button  onClick = {navigate(`/petPage`)}>See more</button>
                {props.page == 'search-page' && <button  onClick = {handleSavePet}>Save</button>}
                {(props.page == 'search-page'  || props.page == 'saved-pets')&& <button  onClick = {handleDeletePet}>Delete</button>}

            </div>
            

            


        </div>
    );
}

export default Card;

{/* <div className="card">
    <div className="card-header">
        <div className="profile">
            <span className="letter">{props.author[0]}</span>
        </div>
        <div className="card-title-group">
            <h5 className="card-title">{props.title}</h5>
            <div className="card-date">{props.date}</div>
        </div>
    </div>
    <img className="card-image" src={food} alt="Logo" />
    <div className="card-text">{props.description}</div>
    <div className="card-like-bar">
        {props.liked ? (
            <img className="card-like-icon" src={heartFill} alt="Logo" />
        ) : (
            <img className="card-like-icon" src={heartOutline} alt="Logo" />
        )}
        <div className="like-text">
            <b>{props.likeCount}</b> kişi bu tarifi beğendi.
        </div>
    </div>
</div> */}