import { Schema, model, Types } from 'mongoose'

const articleSchema = new Schema(
  {
    title: { required: true, type: String },
    description: { required: true, type: String },
    arrImgFileNames: [{ type: String }],
    arrElementsJson: { required: true, type: String },
    authorName: { required: true, type: String },
    authorId: { required: true, type: Types.ObjectId, ref: 'User' },
    arrCommentsId: [{ type: Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
)

export default model('Article', articleSchema)
