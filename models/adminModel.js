const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    username:String,
    password:String,
    email :String,
    confirmpassword: String
},{timestamps : true});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;