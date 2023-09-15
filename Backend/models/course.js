// want to mongobd connetion
const mongoose = require("mongoose");

// create a chemea for course
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  
  name: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  }

});


const course = mongoose.model("course",courseSchema); // model include {collection name}, {Schema name}

// export the Schema use for routes
module.exports = course;