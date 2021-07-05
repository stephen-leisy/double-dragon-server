import { Router } from 'express';
import Snack from '../models/Snack.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const item = await Snack.insert(req.body);
      res.send(item);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const items = await Snack.findAll();
      res.send(items);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const itemEdit = await Snack.update(req.body, req.params.id);
      res.send(itemEdit);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Snack.delete(req.params.id);
      res.send({
        success: 'that shit is deleted',
      });
    } catch (err) {
      next(err);
    }
  });
