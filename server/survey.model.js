import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  answer: String,
});

export default mongoose.model('Survey', surveySchema);
