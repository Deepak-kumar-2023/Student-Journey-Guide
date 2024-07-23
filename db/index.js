// connnecting to the database

const mongoose = require('mongoose');
const MONGODB_URI="mongodb+srv://deepaksaurabh176:N2A9MqA2XfjSmfQn@cluster0.f8qsjtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log("DB URI =",MONGODB_URI);
const DB_NAME = "myFirstDatabase"
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}
export default connectDB