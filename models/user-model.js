const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    selectedUniversities: [
      {
        name: {
          ru: { type: String},
          uz: { type: String},
          en: { type: String},
        },
        id: { type: String },
        city: { type: String },
        country: { type: String }
      }
    ],
    appliedUniversities: [{type: String}]
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema);
