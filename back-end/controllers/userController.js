import db from '../connection.js'
import bcrypt from 'bcrypt';


const connection = db;

const getUserById = async (req, res) => {
    const sqlQuery = `SELECT *
    FROM users
    WHERE id = '${req.params.id}';`
    

    connection.query(sqlQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            
            delete result[0].password;
            res.status(200).send(result[0]);
            return;
        }
    });
}

const updateUser = async (req, res) => {
    //allowes the user to change their settings while logged in
    //validate input
    //ensure mail isn't in use

    /*fields:
    password
    email
    firstname
    lastname
    phone number
    bio
    */
    let hashedPassword;

    if(req.body.password){
        
        hashedPassword = await bcrypt.hash(req.body.password , 10);

    }

    let query = `UPDATE users SET `;

    hashedPassword && (query += `password = '${hashedPassword}', `);
    req.body.email && (query += `email = '${req.body.email}', `);
    req.body.fname && (query += `fname = '${req.body.fname}', `);
    req.body.lname && (query += `lname = '${req.body.lname}', `);
    req.body.phone && (query += `phone = '${req.body.phone}', `);
    req.body.bio && (query += `bio = '${req.body.bio}', `);
    
    
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

const getallUsers = async (req, res) => {

    const sqlQuery = `SELECT *
    FROM users;`
    

    connection.query(sqlQuery, (err, result) => {
        if (err){
         
            res.status(400).send(err);
            return;
        }
        else{
            
            for(let i = 0; i < result.length; i++){
                delete result[i].password;
            }
            res.status(200).send(result);
            return;
        }
    });
}

const getFullUserById = async (req, res) => {
    //returns all data about user besides from password
    //also returns all the pets the user owns

    // res.send(req.params.id);
    // return;
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }


    let stringOfPetsId = '';
    let petsArray = [];

    const getOwnedPetsQuery = `SELECT owned_pets FROM user_pets WHERE user_id = ${req.params.id};` 
    const getSavedPetsQuery = `SELECT liked_pets FROM user_pets WHERE user_id = ${req.params.id};` 
    
    const response = new Object;

    const sqlQuery = `SELECT * FROM users WHERE id = '${req.params.id}';`;
    connection.query(sqlQuery, async (err, result) => {
        if (err){
            res.send(err);
            return;
        }
        else {
           
                delete result[0].password;
                response.user = result[0]
                


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
                                        response.pets = result;
                                        res.status(200).send(response);
                                        return;
                                    }
                                });
                            }
                        });
                    }
                });


            }
            
        }
    );
}

export default { getUserById, updateUser, getallUsers, getFullUserById };
