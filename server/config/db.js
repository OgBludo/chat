const mongoose = require("mongoose");
const colors = require("colors")

const connectDB = async() =>
{
    try{
        const conn = await mongoose.connect(process.env._MONGO_URL, {
                useNewUrlParser:true
            });
            console.log(`MongoDB connected:${conn.connection.host}`.blue.bold);
    }
    catch(error)
    {
        console.log(`Error:${error.message}`);
        process.exit();
    }
};
module.exports = connectDB;