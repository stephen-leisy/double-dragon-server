import express from 'express';
import cocktailController from '../lib/controllers/cocktails.js';
import mainController from '../lib/controllers/mains.js';
import snackController from '../lib/controllers/snacks.js';
import saladController from '../lib/controllers/salads.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';

const app = express();

app.use(express.json());

app.use('/api/v1/cocktails', cocktailController);
app.use('/api/v1/mains', mainController);
app.use('/api/v1/snacks', snackController);
app.use('/api/v1/salads', saladController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
