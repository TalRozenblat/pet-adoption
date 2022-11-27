import bcrypt from 'bcrypt';
import db from '../connection.js'
import jwt from 'jsonwebtoken';

const connection = db;

const login = async (req, res) =>{

    const sqlQuery = `SELECT * FROM users WHERE email = '${req.body.email}';`;

    const user = connection.query(sqlQuery, async (err, result) => {
        if (err){
            res.send(err);
            return;
        }
        else{
            if (result[0] === undefined){
                res.status(400).send('Email or password is incorrect.');
                return;
            }
            if(await bcrypt.compare(req.body.password, result[0].password)){
                // delete result[0].password;
                const user = {
                    id: result[0].id,
                    email: result[0].email,
                    fname: result[0].fname,
                    lname: result[0].lname,
                    phone: result[0].phone,
                    admin: result[0].admin
                }
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.json({ accessToken: accessToken });
                // res.send(result[0]);
                return;
            }
            else{
                res.status(400).send('Email or password is incorrect.');
                return;
            }
        
        }
    })


}


export default { login };