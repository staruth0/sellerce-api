import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
        id: {
          type: String,
          required: true,
        },
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
        },

  },
  { timestamps: true }
);

const FAQ = mongoose.model('FAQ', FAQSchema);
export default FAQ;