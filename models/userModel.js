const mongoose = require('mongoose');

(()=>{
    mongoose.connect('mongodb+srv://deepaksaurabh176:N2A9MqA2XfjSmfQn@cluster0.f8qsjtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/dbname')
})()

const userSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        password:  String,
    }
)

module.exports = mongoose.model("myuser", userSchema);

