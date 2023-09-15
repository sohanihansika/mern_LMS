// want to mongobd connetion
const mongoose = require("mongoose");

// create a chemea for marks
const Schema = mongoose.Schema;
const marksSchema = new Schema({
  
  subjectNo: {
    type: String,
    required: true,
  },
  mark: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  }

});


const Marks = mongoose.model("Marks",marksSchema); // model include {collection name}, {Schema name}

// export the Schema use for routes
module.exports = Marks;