const mongoose = require("mongoose");

const contact = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 30,
    require: [true, "Set name for contact"],
  },
  email: {
    type: String,
    minlength: 1,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
