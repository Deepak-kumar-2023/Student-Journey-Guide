const express = require('express'); 
const bcrypt = require('bcrypt');
require('dotenv').config();
const userModel = require('./models/userModel');
const { log } = require('winston');
const app = express();




const saltRounds = 10; // Recommended for secure password hashing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Render Login Form
app.get('/', (req, res) => {
    res.render('login_form');
});

app.get('/login', (req, res) => {
  res.render('login_form');
});


// Render Sign-Up Form
app.get('/signup', (req, res) => {
    res.render('sign_up');
});

// Handle Login
app.post('/post_login', async (req, res) => {
  
        const { email, password } = req.body;
    
        // Updated regex for the new email pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+\.ug23\.cs@nitp\.ac\.in$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("Only emails ending with '.ug23.cs@nitp.ac.in' are allowed.");
        }
    
        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }
    
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).send("User not found.");
            }
    
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.render('index', { username: user.username, email: user.email });
            } else {
                res.status(401).send("Incorrect password.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send("Internal server error.");
        }
 
    
});

// Handle Sign-Up
app.post('/post_signup', async (req, res) => {
   
        const { username, email, password } = req.body;
    
        const emailRegex = /^[a-zA-Z0-9._%+-]+\.ug23\.cs@nitp\.ac\.in$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("Only emails ending with '.ug23.cs@nitp.ac.in' are allowed.");
        }
    
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required.");
        }
    
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({ username, email, password: hashedPassword });
            res.render('index', { username: newUser.username, email: newUser.email });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).send("Internal server error.");
        }
   
    
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening at http://localhost:${process.env.PORT || 3000}`);
});

