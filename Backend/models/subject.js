// want to mongobd connetion
const mongoose = require("mongoose");

// create a chemea for subject
const Schema = mongoose.Schema;
const subjectSchema = new Schema({
  
  subject_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  credit: {
    type: String,
    required: true,
  }

});


const Subject = mongoose.model("Subject",subjectSchema); // model include {collection name}, {Schema name}

// export the Schema use for routes
module.exports = Subject;