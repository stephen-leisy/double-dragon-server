import { Router } from 'express';
import Main from '../models/Main.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const item = await Main.insert(req.body);
      res.send(item);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const items = await Main.findAll();
      res.send(items);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const itemEdit = await Main.update(req.body, req.params.id);
      res.send(itemEdit);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Main.delete(req.params.id);
      res.send({
        success: 'that shit is deleted',
      });
    } catch (err) {
      next(err);
    }
  });
