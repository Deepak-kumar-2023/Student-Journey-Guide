const express = require('express'); 
const bcrypt = require('bcrypt');
const saltRounds = 0;
require('dotenv').config()
const userModel = require('./models/userModel');
const app = express();


app.use(express.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login_form')
});
app.get('/signup', (req, res) => {
    res.render('sign_up');
});
app.get('/user',async (req, res) => {
  const email=req.query.email;
 console.log("email",email);
   await  userModel.findOne({email:email}).then((user)=>{
    bcrypt.compare(req.query.password, user.password, function(err, result) {
      if(result){
        res.render('index', {
          // test email:google@gmail.com password:abc --> registered user
          username: user.username,
          email: user.email,
      });
      }else{
        res.redirect('/login');
      }
    });
  
});
});

app.get('/login', (req, res) => {
    res.render('login_form');
});
app.get('/userProfile', (req, res) => {
    const uesrname = req.query.Username;
    const emial = req.query.email;
    const password = req.query.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt,async function(err, hash) {
          // Store hash in your password DB.
        const newuser=  await userModel.create({username:uesrname,email:emial,password:hash});

        console.log("new user",newuser);
      });
  })
    res.render('userProfile', {
        username: uesrname,
        email: emial,
    });
});




app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
