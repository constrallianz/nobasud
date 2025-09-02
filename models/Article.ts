import { Schema, models, model } from 'mongoose'

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  coverImageUrl: { type: String },
  tags: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: true },
}, { timestamps: true })

export default models.Article || model('Article', ArticleSchema)
