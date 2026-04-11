require('dotenv').config();

const mongoose = require('mongoose');



(async () => {
    try {
        console.log('Connecting to database...');
        console.log('Using connection string:', process.env.mongoURI);
        await mongoose.connect(process.env.mongoURI, { dbName: "good" });
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

