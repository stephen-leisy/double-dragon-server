import { Router } from 'express';
import Cocktail from '../models/Cocktail';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const cocktail = await Cocktail.insert(req.body);
      res.send(cocktail);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cocktails = await Cocktail.findAll();
      res.send(cocktails);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const editTail = await Cocktail.update(req.body, req.params.id);
      res.send(editTail);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Cocktail.delete(req.params.id);
      res.send({
        success: 'that shit is deleted',
      });
    } catch (err) {
      next(err);
    }
  });
