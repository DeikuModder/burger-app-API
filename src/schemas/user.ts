import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true },
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);

export default User;
