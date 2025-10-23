import { Router } from 'express';
import { startSubmission, submitAnswer, getReport } from '../controllers/product.controller';

const router = Router();

router.post('/products', startSubmission);
router.post('/products/:productId/answer', submitAnswer);
router.get('/products/:productId/report', getReport);

export default router;