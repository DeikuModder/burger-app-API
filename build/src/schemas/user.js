"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true },
}, { versionKey: false });
userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        delete returnedObject.passwordHash;
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
