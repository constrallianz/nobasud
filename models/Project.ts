import { Schema, models, model } from 'mongoose'

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['voirie', 'batiment', 'amenagement', 'autre'], required: true },
  location: { type: String },
  description: { type: String },
  images: [{ type: String }],
}, { timestamps: true })

export default models.Project || model('Project', ProjectSchema)
