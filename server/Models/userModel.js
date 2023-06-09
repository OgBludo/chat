const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        password: 
        {
            type: String,
            required: true
        },
        uPic: 
        {
            type: String,
            required: true,
            default: 'https://i.paste.pics/cdea85a8d7916b5687b94b590083d1cc.png'
        },
    },
    {
        timestamps:true,
    }
);

userSchema.pre('save',async function(next)
{
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
userSchema.methods.matchPassword = async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model("User",userSchema)

module.exports = User;