import { Request, Response } from 'express';
import { pool } from '../services/database.service';
import { getNextQuestion } from '../services/ai.service';
// --- FIX 1: The import name must be 'generateReportPDF' ---
import { generateReportPDF } from '../services/pdf.service';

// Shape of AI history
interface Answer { question: string; answer: string; }

// 1. Start a new submission
export const startSubmission = async (req: Request, res: Response) => {
  const { productName, companyName } = req.body;
  
  try {
    const productRes = await pool.query(
      'INSERT INTO products (product_name, company_name) VALUES ($1, $2) RETURNING *',
      [productName, companyName]
    );
    const product = productRes.rows[0];
    
    // Get the first question from the AI
    const aiResponse = await getNextQuestion(product.product_name, "Uncategorized", []);
    
    // Save the first question
    const qRes = await pool.query('INSERT INTO questions (question_text, question_type) VALUES ($1, $2) RETURNING *', [aiResponse.next_question, aiResponse.question_type]);
    
    res.status(201).json({
      product: product,
      nextQuestion: qRes.rows[0],
    });
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

// 2. Submit an answer and get the next question
export const submitAnswer = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { question_id, answer_text } = req.body;
  
  try {
    // 1. Save the answer
    await pool.query('INSERT INTO product_answers (product_id, question_id, answer_text) VALUES ($1, $2, $3)', [productId, question_id, answer_text]);
    
    // 2. Get full product history
    const historyRes = await pool.query(
      `SELECT q.question_text, pa.answer_text 
       FROM product_answers pa JOIN questions q ON pa.question_id = q.question_id
       WHERE pa.product_id = $1 ORDER BY pa.created_at ASC`,
       [productId]
    );
    const productRes = await pool.query('SELECT * FROM products WHERE product_id = $1', [productId]);
    
    const history = historyRes.rows.map(r => ({ question: r.question_text, answer: r.answer_text }));
    
    // 3. Determine category (this is "Wisdom" logic)
    const categoryAnswer = history.find(h => h.question.toLowerCase().includes("category"));
    const category = categoryAnswer ? categoryAnswer.answer : "Uncategorized";

    // 4. Get next question from AI
    const aiResponse = await getNextQuestion(productRes.rows[0].product_name, category, history);
    
    if (aiResponse.is_final_question) {
      return res.json({ is_final_question: true });
    }
    
    // 5. Save the new question
    const qRes = await pool.query('INSERT INTO questions (question_text, question_type) VALUES ($1, $2) RETURNING *', [aiResponse.next_question, aiResponse.question_type]);
    
    res.json({ nextQuestion: qRes.rows[0] });
    
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

// 3. Download the PDF report
export const getReport = async (req: Request, res: Response) => {
  const { productId } = req.params;
  if (!productId) return res.status(400).send('Missing product ID');
  
  try {
    // --- FIX 2: The function call must also be 'generateReportPDF' ---
    const pdfBytes = await generateReportPDF(productId);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${productId}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};