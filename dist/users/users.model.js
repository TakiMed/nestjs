"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_role_enum_1 = require("./user.role.enum");
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    id: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: user_role_enum_1.UserRole, requiredL: true },
    createdProducts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
});
module.exports = mongoose.model('User', exports.UserSchema);
//# sourceMappingURL=users.model.js.map