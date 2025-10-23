import axios from 'axios';

// This is the shape of the data we send TO the AI
interface Answer {
  question: string;
  answer: string;
}

// This function calls your Python AI service
export const getNextQuestion = async (
    product_name: string, 
    product_category: string, 
    history: Answer[]
) => {
  const AI_URL = process.env.AI_SERVICE_URL;

  const response = await axios.post(`${AI_URL}/generate-questions`, {
    product_name,
    product_category,
    history
  });

  return response.data; // { next_question, question_type, is_final_question }
};