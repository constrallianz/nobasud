import { Schema, models, model } from 'mongoose'

const ApplicationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cvUrl: { type: String, required: true },
  coverLetterUrl: { type: String },
  message: { type: String },
}, { timestamps: true })

export default models.Application || model('Application', ApplicationSchema)
