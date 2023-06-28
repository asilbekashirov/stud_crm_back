const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
