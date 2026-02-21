
const mongoose = require('mongoose');
const type = require('mongoose/lib/schema/operators/type');
const { Schema } = mongoose;

const ProgramMaster = new mongoose.Schema({
  Title: { type:String, required: true },
  Input: { type: String, required: true },
  Output: { type: Date, required: true },
  Program: { type: String, required: true },
  PickupPoint: { type: String },
  Void: { type: String }
}
, {
  collection: 'ProgramMaster',
  timestamps: true
});


module.exports = {  
  ProgramMaster:mongoose.model('BookingSchema',ProgramMaster),
};
