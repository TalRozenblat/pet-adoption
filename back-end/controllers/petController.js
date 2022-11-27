import { response } from 'express';
import db from '../connection.js'
import { v2 as cloudinary } from 'cloudinary';


const connection = db;

const addPet = async (req, res) => {
    //protected to admin only
    //validate user input
    
    const uploadResult = req.file && await cloudinary.uploader.upload(req.file.path);

    const addPetQuery = `INSERT INTO pets (name, type, status, picture, height, weight, color, bio, hypo, diet, breed) VALUES ('${req.body.name}', '${req.body.type}', '${req.body.status}', '${uploadResult ? uploadResult.secure_url : null}', '${req.body.height}', '${req.body.weight}', '${req.body.color}', '${req.body.bio}', '${req.body.hypo}', '${req.body.diet}', '${req.body.breed}');`;

    connection.query(addPetQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{

            res.status(201).send(result);
            return;
        }
    });

}

const getPets = async (req, res) => {
    /* 
        returns pets according to search parameters 
    */


    let query = `SELECT * FROM pets `;

    if(req.url.indexOf('?') !== -1){
        query += `WHERE `;
        req.query.name && (query += `name = '${req.query.name}' AND `);
        req.query.status && (query += `status = '${req.query.status}' AND `);
        req.query.height && (query += `height = '${req.query.height}' AND `);
        req.query.weight && (query += `weight = '${req.query.weight}' AND `); 
        req.query.type && (query += `type = '${req.query.type}' AND `);

        query = query.slice(0, -5);

    }
    
    query += `;`;
    
    
    connection.query(query, (err, result) => {
        if (err){
            
            res.status(400).send(err);
            return;
        }
        else{
            
           res.send(result)

            return;
        }
    });
}

const getPet = async (req, res) => {
    const sqlQuery = `SELECT *
    FROM pets
    WHERE id = '${req.params.id}';`
    
    connection.query(sqlQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            res.status(200).send(result[0]);
            return;
        }
    });
    
}

const editPet = async (req, res) => {
    //protected to admin only
    //validate user input
    

    const uploadResult = req.file && await cloudinary.uploader.upload(req.file.path);

    let query = `UPDATE pets SET `;

    req.body.name && (query += `name = '${req.body.name}', `);
    req.body.type && (query += `type = '${req.body.type}', `);
    req.body.status && (query += `status = '${req.body.status}', `);
    req.body.height && (query += `height = '${req.body.height}', `);
    req.body.weight && (query += `weight = '${req.body.weight}', `);
    req.body.color && (query += `color = '${req.body.color}', `);
    req.body.bio && (query += `bio = '${req.body.bio}', `);
    req.body.hypo && (query += `hypo = '${req.body.hypo}', `);
    req.body.diet && (query += `diet = '${req.body.diet}', `);
    req.body.breed && (query += `breed = '${req.body.breed}', `);
    uploadResult && (query += `picture = '${uploadResult.secure_url}',`);
    
    query = query.slice(0, -2);
    query += ` WHERE id = ${req.params.id};`;

    
    connection.query(query, (err, result) => {
        if (err){
            
            res.status(400).send(err);
            return;
        }
        else{
            
           res.send(result)

            return;
        }
    });
}

const adoptPet = async (req, res) => {
    //protected to logged in users
    //responsible for adding the pet to the current users pet pool
    //needs to change the pets adotion status in it's relevant table

    //adding the pet to the array: 
    // const getPetsQuery = `SELECT owned_pets FROM user_pets WHERE user_id = ${req.body.user_id};` 
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    const getPetsQuery = `SELECT owned_pets FROM user_pets WHERE user_id = ${req.body.user_id};` 

    let newPetArrayToPush;

    connection.query(getPetsQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            let petArray = result[0].owned_pets;
            if(petArray === '[null]'){
                petArray =[parseInt(req.params.id)];
                newPetArrayToPush = petArray;

            }
            
            else{

                let filtered = petArray.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
                if(!filtered.includes(parseInt(req.params.id))){

                    filtered.push(parseInt(req.params.id));
                }
                
                newPetArrayToPush = filtered;
            }
            
            newPetArrayToPush.filter(onlyUnique);

            const addPetToUserQuery = `UPDATE user_pets SET owned_pets = '[${newPetArrayToPush}]' WHERE user_id = ${req.body.user_id};`;

            const changeAdoptionStatusInPetQuery = `UPDATE pets SET status = '${req.body.type}' WHERE id = '${req.params.id}';`

            
            connection.query(addPetToUserQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                }
            });
        
            connection.query(changeAdoptionStatusInPetQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                res.send(result);
                    
                }
            });
        }
    });

    
}

const returnPet = async (req, res) => {
    //protected to logged in users
    //responsible for returning the pet to the agency
    // should change pets status back to available
    // should remove the pet from the users pets


    const getPetsQuery = `SELECT owned_pets FROM user_pets WHERE user_id = ${req.body.user_id};` 

    
    connection.query(getPetsQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            let petArray = result[0].owned_pets;
            const filtered = petArray.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));

            if(filtered.includes(parseInt(req.params.id))){

                const index = filtered.indexOf(parseInt(req.params.id));
                filtered.splice(index, 1);
                if(filtered[0] == undefined){
                    filtered.push('null');
                }
            }


            const removePetFromUserQuery = `UPDATE user_pets SET owned_pets = '[${filtered}]' WHERE user_id = ${req.body.user_id};`;

            const changeAdoptionStatusInPetQuery = `UPDATE pets SET status = 'available' WHERE id = '${req.params.id}';`

            connection.query(removePetFromUserQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                }
            });
        
            connection.query(changeAdoptionStatusInPetQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                    
                }
            });

            
        }
        res.status(200).send(result);
        return;
    });

}

const savePet = async (req, res) => {
    //allowed the user to save a pet for later
    //saved pet should be stored as saved in the users account

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

    const getPetsQuery = `SELECT liked_pets FROM user_pets WHERE user_id = ${req.body.user_id};` 

    let newPetArrayToPush;
    
    connection.query(getPetsQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            let petArray = result[0].liked_pets;
            if(petArray === '[null]'){
                petArray =[parseInt(req.params.id)];
                newPetArrayToPush = petArray;

            }
            
            else{

                let filtered = petArray.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
                if(!filtered.includes(parseInt(req.params.id))){

                    filtered.push(parseInt(req.params.id));
                }
                
                newPetArrayToPush = filtered;
            }
            
            newPetArrayToPush.filter(onlyUnique);

            const addPetToUserQuery = `UPDATE user_pets SET liked_pets = '[${newPetArrayToPush}]' WHERE user_id = ${req.body.user_id};`;
            
            connection.query(addPetToUserQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                    res.status(200).send(result);
                }
            });
        
          
        }
    });
}

const deletePet = async (req, res) => {
    //removes a saved pet

    const getPetsQuery = `SELECT liked_pets FROM user_pets WHERE user_id = ${req.body.user_id};` 

    connection.query(getPetsQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            let petArray = result[0].liked_pets;
            const filtered = petArray.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));

            if(filtered.includes(parseInt(req.params.id))){

                const index = filtered.indexOf(parseInt(req.params.id));
                filtered.splice(index, 1);
                if(filtered[0] == undefined){
                    filtered.push('null');
                }
            }


            const removePetFromUserQuery = `UPDATE user_pets SET liked_pets = '[${filtered}]' WHERE user_id = ${req.body.user_id};`;

            connection.query(removePetFromUserQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                    res.status(200).send(result);
                    return;
                }
            });
        
        }
        
    });

}

const getPetsByUserId = async (req, res) => {
    //allows the user to get pets owned or saved by a user based on the user id

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    let stringOfPetsId = '';
    let petsArray = [];

    const getOwnedPetsQuery = `SELECT owned_pets FROM user_pets WHERE user_id = ${req.params.id};` 
    const getSavedPetsQuery = `SELECT liked_pets FROM user_pets WHERE user_id = ${req.params.id};` 
    
    

    connection.query(getOwnedPetsQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{

            let filtered = result[0].owned_pets.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
            
            filtered.map(id => {petsArray.push(id)});
            // filtered.map(id => {stringOfPetsId += `'${id}', `});
            // stringOfPetsId = stringOfPetsId.slice(0, -2);
            
            connection.query(getSavedPetsQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
        
                    let filtered = result[0].liked_pets.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
                    
                    filtered.map(id => {petsArray.push(id)});
                    petsArray.filter(onlyUnique);
                    
                    petsArray.filter(onlyUnique).map(id => {stringOfPetsId += `'${id}', `});
                    stringOfPetsId = stringOfPetsId.slice(0, -2);
                    
                    const getPetsQuery = `SELECT * FROM pets WHERE id IN(${stringOfPetsId})`
                    connection.query(getPetsQuery, (err, result) => {
                        if (err){
                         
                            res.status(400).send(err);
                            return;
                        }
                        else{
                            res.status(200).send(result);
                            return;
                        }
                    });
                }
            });
        }
    });

    
}


const getPetsByUserId2 = async (req, res) => {
    //allows the user to get pets owned or saved by a user based on the user id

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    let stringOfPetsId = '';
    let stringOfSavedPetsId = '';
    let petsArray = [];
    let savedPetsArray = [];
    const resObj = {};

    const getOwnedPetsQuery = `SELECT owned_pets FROM user_pets WHERE user_id = ${req.params.id};` 
    const getSavedPetsQuery = `SELECT liked_pets FROM user_pets WHERE user_id = ${req.params.id};` 
    
    

    connection.query(getOwnedPetsQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            
            
            let filtered = result[0].owned_pets.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
            
            filtered.map(id => {petsArray.push(id)});
            filtered.map(id => {stringOfPetsId += `'${id}', `});
            stringOfPetsId = stringOfPetsId.slice(0, -2);
            
            connection.query(getSavedPetsQuery, (err, result) => {
                if (err){
                 
                    res.status(400).send(err);
                    return;
                }
                else{
                    
                    if(result[0].liked_pets === '[null]'){
                        
                    }
                    let filtered = result[0].liked_pets.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e));
                    
                    filtered.map(id => {savedPetsArray.push(id)});
                    savedPetsArray.filter(onlyUnique);
                    
                    
                    
                    savedPetsArray.filter(onlyUnique).map(id => {stringOfSavedPetsId += `'${id}', `});
                    stringOfSavedPetsId = stringOfSavedPetsId.slice(0, -2);
                    
                    const getPetsQuery = `SELECT * FROM pets WHERE id IN(${stringOfPetsId})`
                    connection.query(getPetsQuery, (err, result) => {
                        if (err){
                         
                            res.status(400).send(err);
                            return;
                        }
                        else{
                            
                            resObj.owned_pets = result;
                            
                            const getSavedPetsQuery = `SELECT * FROM pets WHERE id IN(${stringOfSavedPetsId})`
                            connection.query(getSavedPetsQuery, (err, result) => {
                                if (err){
                         
                                    res.status(400).send(err);
                                    return;
                                }

                                else{
                            
                                    resObj.liked_pets = result;
                                    res.send(resObj);
                                    return;
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    
}

const doesUserLike = async (req, res) => {
    
    const sqlQuery = `SELECT *
    FROM pets
    WHERE id = '${req.params.id}';`
    
    connection.query(sqlQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            res.status(200).send(result[0]);
            return;
        }
    });
}
export default { addPet, getPets, getPet, editPet, adoptPet, returnPet, savePet, deletePet, getPetsByUserId, getPetsByUserId2, doesUserLike }