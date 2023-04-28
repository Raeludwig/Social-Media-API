const { Schema, model, Types } = require("mongoose");

const reactionsSchema = new Schema(
  {
    reactionId: 
        {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
        },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (createdAtVal) => new Date(createdAtVal).toLocaleString(),
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


module.exports = reactionsSchema;
