import { Schema, model, Types } from 'mongoose'

const commentSchema = new Schema(
  {
    articleId: { type: Types.ObjectId, ref: 'Article' },
    parentCommentId: { type: Types.ObjectId, ref: 'Comment' },
    commentText: { required: true, type: String },
    commentatorName: { required: true, type: String },
    commentatorId: { required: true, type: Types.ObjectId, ref: 'User' },
    answers: [{ type: Types.ObjectId, ref: 'Comment' }],
    arrLikes: [{ type: Types.ObjectId, ref: 'User' }],
    arrDislikes: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

export default model('Comment', commentSchema)
