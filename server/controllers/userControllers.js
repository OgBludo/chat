const asyncHandler = require("express-async-handler")
const User = require("../Models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req,res) =>
{
    const {name,email,password,uPic} = req.body;
    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error("Пожалуйста заполните все поля");
    }
    const userExists = await User.findOne({email});
    if(userExists)
    {
        res.status(400);
        throw new Error("Пользователь уже существует");
    }
    const user = await User.create({
        name,
        email,
        password,
        uPic,
    });
    if(user)
    {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            uPic: user.uPic,
            token: generateToken(user._id),
        });
        
    }
    else{
        res.status(500);
        throw new Error("Ошибка в создании пользователя");
    }
});

const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            uPic: user.uPic,
            token: generateToken(user._id),
        });
    }
        else{
            res.status(500);
            throw new Error("Неправильно что-то");
    }
})

// /api/user?search=Mihail
const allUsers = asyncHandler(async (req,res) =>
{
    const keyword = req.query.search ?{
        $or: [
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{};
    const users = await User.find(keyword).find({ _id:{ $ne: req.user._id }});
    res.send(users);
});

module.exports={registerUser, authUser,allUsers};