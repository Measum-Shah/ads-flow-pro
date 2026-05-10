import mongoose from "mongoose";

const learningQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const LearningQuestion = mongoose.model("LearningQuestion", learningQuestionSchema);
export default LearningQuestion;