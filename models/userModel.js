require('dotenv').config();

const mongoose = require('mongoose');



(async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
})();

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password:  String,
    }
)

console.log("userSchema")

module.exports = mongoose.model("myuser", userSchema);

