import app from './lib/app.js';
import pool from './lib/utils/pool.js';

const PORT = process.env.PORT || 7880;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});

process.on('exit', () => {
  console.log('Goodbye!');
  pool.end();
});
