const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Register = new Schema (
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        gender: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        confirmPassword: { type: String, required: true },
        role: {type: Number, default: '2'},
        // tokens:[{
        //     token: { type: String, required: true}
        // }]
    },
);

Register.methods.generateAuthToken = async function() {
    try {
        console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token
    } catch (error) {
        res.send("the error: "+error);
        console.log("the error: "+error);
    }
}

Register.post('save', function(doc, next){
    console.log("new user was created", doc);
    next()
})
//Mã hóa mật khẩu
Register.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        this.confirmPassword = await bcrypt.hash(this.password,10);;
    }
    next();
});
Register.statics.login = async function(email, password){
    const user = await this.findOne({ email});
    if (user) {
        const auth = bcrypt.compare(password ,user.password);
        if (auth) {
            return user;
        } else {
            throw Error('incorrect email');
        }
    }
    throw Error('incorrect email');
}



module.exports = mongoose.model("Register", Register);