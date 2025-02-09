const mongoose = require('mongoose');

(async () => {
    try {
        await mongoose.connect('mongodb+srv://deepaksaurabh176:o99ZNniTPC5Hmo76@cluster0.3s8ko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/studentJourneyGuide');
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

