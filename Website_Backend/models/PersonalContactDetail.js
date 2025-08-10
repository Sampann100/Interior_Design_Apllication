const mongoose = require("mongoose");

const personalContactSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  Address1: { type: String, required: true },
  Address2: { type: String },
  Country: { type: String, required: true },
  State: { type: String, required: true },
  Zip: { type: String, required: true },
  Message: { type: String, required: true },
});

const PersonalContactDetailModel = mongoose.model(
  "personalContactDetailModel",
  personalContactSchema,
  "personalContactDetail"
);

module.exports = PersonalContactDetailModel;