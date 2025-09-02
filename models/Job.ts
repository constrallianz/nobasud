import { Schema, models, model } from 'mongoose'

const JobSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  department: { type: String },
  location: { type: String },
  description: { type: String },
  published: { type: Boolean, default: true },
}, { timestamps: true })

export default models.Job || model('Job', JobSchema)
