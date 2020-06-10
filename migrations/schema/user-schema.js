
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    salt: { type: String },
    sector: { type: String, required: true },
});
  
module.exports = mongoose.model('User', UserSchema);
