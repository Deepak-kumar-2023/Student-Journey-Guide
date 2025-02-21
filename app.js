const express = require('express'); 
const bcrypt = require('bcrypt');
require('dotenv').config();
const userModel = require('./models/userModel');
const cors = require('cors');

const app = express();

app.use(cors());

app.use("downloads", express.static("downloads"));


const Visit = require('./models/visitModel');


// Ensure a visit document exists in the database
const initializeVisitCounter = async () => {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit({ count: 0 });
            await visit.save();
            console.log("Visitor counter initialized to 0.");
        }else{
            console.log("Visitor counter already initialized.",visit.count);
        }
    } catch (error) {
        console.error("Error initializing visitor counter:", error);
    }
};

initializeVisitCounter();



const saltRounds = 10; // Recommended for secure password hashing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//download option 
app.get("/download/:filename", (req, res) => {
    const filePath = path.join(__dirname, "downloads", req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(500).send("Error downloading the file.");
        }
    });
});


// Render Login Form
app.get('/', async (req, res) => {
    try {
        // Increment visitor count
        const visit = await Visit.findOne();
        visit.count += 1;
        await visit.save();

    } catch (error) {
        console.error("Error updating visitor counter:", error);
        res.status(500).send("Internal server error.");
    }
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
                res.render('login_form');
            }
    
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const visit = await Visit.findOne();
                res.render('index', { username: user.username, email: user.email, visitCount: visit.count });
            } else {
                res.render('login_form');
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
            const visit = await Visit.findOne();
            res.render('index', { username: newUser.username, email: newUser.email, visitCount: visit.count });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).send("Internal server error.");
        }
   
    
});


    const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

