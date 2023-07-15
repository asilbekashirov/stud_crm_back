const { Schema, model } = require("mongoose");

const UniversitySchema = Schema(
  {
    name: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
      uz: { type: String, required: true },
    },
    foundIn: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    description: {
      ru: { type: String },
      en: { type: String },
      uz: { type: String },
    },
    image: { type: String },
    bachelors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    masters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    phd: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("University", UniversitySchema);
