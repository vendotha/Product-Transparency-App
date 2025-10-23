import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { pool } from './database.service';

// --- NEW HELPER FUNCTION ---
// This function removes unsupported characters
const sanitizeText = (text: string): string => {
  // Replaces the "Narrow No-Break Space" (0x202f) with a regular space
  return text.replace(/\u202f/g, ' ');
};
// --- END HELPER FUNCTION ---

export const generateReportPDF = async (productId: string): Promise<Uint8Array> => {
  // 1. Get product info and all answers
  const productRes = await pool.query('SELECT * FROM products WHERE product_id = $1', [productId]);
  const product = productRes.rows[0];
  
  const answersRes = await pool.query(
    `SELECT q.question_text, pa.answer_text 
     FROM product_answers pa
     JOIN questions q ON pa.question_id = q.question_id
     WHERE pa.product_id = $1 ORDER BY pa.created_at ASC`,
    [productId]
  );
  const answers = answersRes.rows;

  // 2. Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage();
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 50;

  // --- APPLY SANITIZE FUNCTION ---
  page.drawText(`Transparency Report`, {
    x: 50, y: y, size: 24, font: boldFont, color: rgb(0, 0, 0)
  });
  y -= 30;
  page.drawText(`Product: ${sanitizeText(product.product_name)}`, { // Sanitize
    x: 50, y: y, size: 18, font: boldFont
  });
  y -= 20;
  page.drawText(`Company: ${sanitizeText(product.company_name)}`, { // Sanitize
    x: 50, y: y, size: 16, font: font, color: rgb(0.3, 0.3, 0.3)
  });
  y -= 40;

  // 3. Loop through answers and add them
  for (const item of answers) {
    if (y < 70) { // Add new page if space is low
      page = pdfDoc.addPage();
      y = height - 50;
    }
    
    // --- APPLY SANITIZE FUNCTION ---
    page.drawText(`Q: ${sanitizeText(item.question_text)}`, { // Sanitize
      x: 50, y: y, size: 12, font: boldFont
    });
    y -= 20;
    page.drawText(`A: ${sanitizeText(item.answer_text)}`, { // Sanitize
      x: 60, y: y, size: 12, font: font, color: rgb(0.2, 0.2, 0.2)
    });
    y -= 30;
  }
  
  return pdfDoc.save();
};