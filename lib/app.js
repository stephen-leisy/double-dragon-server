import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cocktailController from './controllers/cocktails';

const app = express();

app.use(express.json());

app.use('/api/v1/cocktails', cocktailController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
