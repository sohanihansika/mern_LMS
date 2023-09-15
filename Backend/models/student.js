// want to mongobd connetion
const mongoose = require("mongoose");

// create a chemea for student
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }

});


const Student = mongoose.model("Student",studentSchema); // model include {collection name}, {Schema name}

// export the Schema use for routes
module.exports = Student;