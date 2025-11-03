require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});


//check connection

db.connect((err)=>{
    if(err){
        console.log('Database connection failed' , err);
    }else{
        console.log('Database connected successfully');
    }
})

app.listen(port, ()=>{
    console.log('server is running on port ' + port);
})

// routes

// get all users
app.get('/users' , (req , res)=>{
    const sql = 'select * from users';
    db.query(sql , (err , result)=>{
        if(err){
            console.log('Error while fetching users' , err);
            res.status(500).send('Error while fetching users');
        }else{
            res.status(200).json(result);
            console.log(result);
            console.log('user data fetched successfully');
        }
    })
});


//user registration 

app.post('/user/register' , async (req, res)=>{
    const {name , phone , email , password} = req.body ;
    const hashedPassword = await bcrypt.hash(password , 10);
    const sql = 'insert into users (name , phone , email, password) values(? , ? , ? , ?)';
    db.query(sql , [name , phone , email , hashedPassword] , (err , result)=>{
        if(err){
            console.log('Error while registering user' , err);
            res.status(500).send('Error while registering user');
        }else{
            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: result.insertId,
                    name,
                    phone,
                    email
                }
            });
            console.log('User registered successfully');
        }
    })
});


// user login 

app.post('/user/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'select * from users where email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('Error while fetching user:', err);
            return res.status(500).send('Error while logging in user');
        }

        if (result.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password); 

        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        console.log('User logged in successfully');
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    });
});


//admin login 

app.post('/admin/login' , (req, res)=>{
    const {email, password} = req.body;
    const sql = 'select * from admin where email = ?';
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error('Error while fetching admin:', err);
            return res.status(500).send('Error while logging in admin');
        }

        if (result.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const admin = result[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        console.log('Admin logged in successfully');
        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        });
    });
});

