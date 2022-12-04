import mysql from 'mysql';
import 'dotenv/config';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

connection.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('connected');
    }
});

const usersTableQuery = `CREATE TABLE if not exists users (
    id int NOT NULL AUTO_INCREMENT, 
    email varchar(100) NOT NULL, 
    fname varchar(45) NOT NULL, 
    lname varchar(45) NOT NULL, 
    password varchar(150) NOT NULL, 
    phone varchar(15), 
    admin tinyint NOT NULL DEFAULT 0, 
    PRIMARY KEY (id), 
    UNIQUE KEY email_UNIQUE (email)) 
    ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`

const petsTableQuery = `CREATE TABLE if not exists pets (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    type varchar(50) NOT NULL,
    status varchar(45) NOT NULL,
    picture varchar(2083) NOT NULL,
    height int NOT NULL,
    weight int NOT NULL,
    color varchar(70) NOT NULL,
    bio text NOT NULL,
    hypo int(1) NOT NULL,
    diet varchar(100) NOT NULL,
    breed varchar(45) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY id_UNIQUE (id)) 
    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

const userPetsTableQuery = `CREATE TABLE if not exists user_pets (
    user_id INT NOT NULL,
    owned_pets JSON NULL,
    liked_pets JSON NULL,
    PRIMARY KEY (user_id));
`;

connection.query(usersTableQuery, (err, result) => {
    if (err){
     
        return;
    }
    else{
        return;
    }
});

connection.query(petsTableQuery, (err, result) => {
    if (err){
     
        return;
    }
    else{
        return;
    }
});

connection.query(userPetsTableQuery, (err, result) => {
    if (err){
     
        return;
    }
    else{
        return;
    }
});

  export default connection;