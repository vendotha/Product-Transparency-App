import React, { useState, FormEvent } from 'react';
import axios from 'axios';

// Data shapes
interface IProduct {
  product_id: string;
  product_name: string;
}
interface IQuestion {
  question_id: string;
  question_text: string;
  question_type: string;
}

const API_URL = process.env.REACT_APP_API_URL;

export const SubmissionForm: React.FC = () => {
  // Form state
  const [productName, setProductName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');

  // App flow state
  const [product, setProduct] = useState<IProduct | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Start Submission
  const handleStart = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/products`, { productName, companyName });
      setProduct(res.data.product);
      setCurrentQuestion(res.data.nextQuestion);
    } catch (err) { setError('Failed to start submission.'); }
    setIsLoading(false);
  };

  // 2. Submit Answer
  const handleSubmitAnswer = async (e: FormEvent) => {
    e.preventDefault();
    if (!product || !currentQuestion) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_URL}/products/${product.product_id}/answer`,
        {
          question_id: currentQuestion.question_id,
          answer_text: currentAnswer,
        }
      );

      if (res.data.is_final_question) {
        setIsFinished(true);
      } else {
        setCurrentQuestion(res.data.nextQuestion);
        setCurrentAnswer('');
      }
    } catch (err) { setError('Failed to submit answer.'); }
    setIsLoading(false);
  };

  // --- RENDER VIEWS ---

  // View 3: Finished
  if (isFinished) {
    return (
      <div className="form-container">
        <h2>Submission Complete!</h2>
        <p>Thank you for submitting: <strong>{product?.product_name}</strong></p>
        <a 
          href={`${API_URL}/products/${product?.product_id}/report`} 
          className="button"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Download Transparency Report (PDF)
        </a>
      </div>
    );
  }

  // View 2: Answering Questions
  if (product && currentQuestion) {
    return (
      <div className="form-container">
        <h3>{product.product_name}</h3>
        <form onSubmit={handleSubmitAnswer}>
          <div className="form-group">
            <label>{currentQuestion.question_text}</label>
            {/* We can expand this for 'boolean' or 'multiple_choice' */}
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              required
              disabled={isLoading}
              autoFocus
            />
          </div>
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? 'Thinking...' : 'Next'}
          </button>
        </form>
      </div>
    );
  }

  // View 1: Start Form
  return (
    <div className="form-container">
      <form onSubmit={handleStart}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Starting...' : 'Start Submission'}
        </button>
      </form>
    </div>
  );
};