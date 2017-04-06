'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let friendScheme = new Schema({
  userName: String,
  loc:{
    type: String,
    "coordinates": Array
  }
});

let friendModel = mongoose.model("friend",friendScheme);

module.exports = friendModel;