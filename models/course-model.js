const { Schema, model } = require("mongoose");

const CourseModel = new Schema(
  {
    name: {
      ru: { type: String, required: true },
      uz: { type: String, required: true },
      en: { type: String, required: true },
    },
    description: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
      uz: { type: String, required: true },
    },
    active: { type: Boolean },
    languages: [{type: String, required: true}],
    educationType: {
      fullTime: {type: Boolean},
      partTime: {type: Boolean},
    },
    tuitionFee: { type: String },
    semesters: { type: Number },
    intake: {
      fall: { type: Boolean },
      spring: { type: Boolean },
    },
    university: {
      type: Schema.Types.ObjectId,
      ref: "University",
    },
  },
  { timestamps: true }
);

module.exports = model("Course", CourseModel);
