// want to mongobd connetion
const mongoose = require("mongoose");

// create a chemea for teacher
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subj: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }

});


const Teacher = mongoose.model("Teacher",teacherSchema); 
// model include {collection name}, {Schema name}

// export the Schema use for routes
module.exports = Teacher;