const express = require('express'); 
const bcrypt = require('bcrypt');
require('dotenv').config();
const userModel = require('./models/userModel');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use('scripts', express.static(__dirname + '/scripts'));


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



// Render home page
app.get('/', async (req, res) => {
    // const visit = await Visit.findOne();
    //         visit.count += 1;
    //         await visit.save();
    res.render('index');
});



//download option 
app.get("/downloads/:filename", async (req, res) => {
    const filePath = path.join(__dirname, "downloads", req.params.filename);
    // const visit = await Visit.findOne();
    res.download(filePath);
    // res.render('index', { visitCount: visit.count });
});
app.get("/views", async (req, res) => {
    // const filePath = path.join(__dirname, "downloads", req.params.filename);
    // const visit = await Visit.findOne();
    // res.download(filePath);
    res.render('all_papers');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});


