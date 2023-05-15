const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./midlleware/errorMIddleware");
require('dotenv').config({path:'/React/chat/server/backend/.env'})
const cors = require('cors')



const PORT = process.env.PORT || 5000

dotenv.config();

connectDB();



const app = express();
app.use(cors())
app.options('*', cors())
// принимаем от фронта json
app.use(express.json());

app.get('/',(req,res)=>
{
    res.send("API runs");
});

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

//обработка недоступных областей
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT,console.log(`Server started ${PORT}`));

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin:"https://org-chat.onrender.com"
    }
})

io.on("connection",(socket)=>{
    console.log("conn to s.io");
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit('connected');
    })
    socket.on('join chat',(room)=>{
        socket.join(room);
        console.log('user jr '+room)
    })
    socket.on('new message',(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log('there is no users');
        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return
            socket.in(user._id).emit("ms recieved",newMessageRecieved)
        });
    })
})