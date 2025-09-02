import { Schema, models, model } from 'mongoose'

const FeedbackSchema = new Schema({
  anonymous: { type: Boolean, default: false },
  name: { type: String },
  email: { type: String },
  subject: { type: String, enum: ['Chantier', 'Article', 'Suggestion', 'Autre'], required: true },
  zone: { type: String },
  message: { type: String, required: true },
  photoUrl: { type: String },
}, { timestamps: true })

export default models.Feedback || model('Feedback', FeedbackSchema)
