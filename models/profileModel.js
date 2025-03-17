const { default: mongoose } = require("mongoose");

const profileSchema = new mongoose.Schema({
    backgroundImg : String,
    profileImg : String
},{timestamps:true});

const Profile = mongoose.model('Profile',profileSchema);

module.exports = Profile