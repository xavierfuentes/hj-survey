import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  'address': String,
  'book': String,
  'business.name': String,
  'business.size': String,
  'colors.blue': Number,
  'colors.green': Number,
  'colors.red': Number,
  'email': String,
  'euresident': Number,
  'name': String,
  'type': String,
});

export default mongoose.model('Survey', surveySchema);
