import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cocktail from '../lib/models/Cocktail';

describe('cocktail routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('posts a new cocktail', async () => {
    const dansNewDrink = {
      cocktailName: 'Slammadamma 2',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 12,
      cocktailIngredients: 'its just chartreuse',
    };

    const newShit = await request(app)
      .post('/api/v1/cocktails')
      .send(dansNewDrink);

    expect(newShit.body).toEqual({
      id: '1',
      cocktailName: 'Slammadamma 2',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 12,
      cocktailIngredients: 'its just chartreuse',
    });
  });

  it('it returns all drinks', async () => {
    await Cocktail.insert({
      cocktailName: 'Slammadamma 2',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 12,
      cocktailIngredients: 'its just chartreuse',
    });
    await Cocktail.insert({
      cocktailName: 'the stuff',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 11,
      cocktailIngredients: 'its fernet',
    });
    const res = await request(app).get('/api/v1/cocktails');

    expect(res.body).toEqual([
      {
        id: '1',
        cocktailName: 'Slammadamma 2',
        iconUrl: 'https://www.placecage.com/200/300',
        cocktailPrice: 12,
        cocktailIngredients: 'its just chartreuse',
      },
      {
        id: '2',
        cocktailName: 'the stuff',
        iconUrl: 'https://www.placecage.com/200/300',
        cocktailPrice: 11,
        cocktailIngredients: 'its fernet',
      },
    ]);
  });

  it('updates a cocktail', async () => {
    const newDrink = await Cocktail.insert({
      cocktailName: 'the stuff',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 11,
      cocktailIngredients: 'its fernet',
    });

    const res = await request(app)
      .put(`/api/v1/cocktails/${newDrink.id}`)
      .send({
        cocktailName: 'Thats the stuff',
        iconUrl: 'https://www.placecage.com/200/300',
        cocktailPrice: 10,
        cocktailIngredients: 'its fernet',
      });

    expect(res.body).toEqual({
      id: '1',
      cocktailName: 'Thats the stuff',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 10,
      cocktailIngredients: 'its fernet',
    });
  });

  it('deletes a cocktail from existence', async () => {
    const newDrink = await Cocktail.insert({
      cocktailName: 'the stuff',
      iconUrl: 'https://www.placecage.com/200/300',
      cocktailPrice: 11,
      cocktailIngredients: 'its fernet',
    });

    const res = await request(app).delete(`/api/v1/cocktails/${newDrink.id}`);
    expect(res.body).toEqual({ success: 'that shit is deleted' });
    expect(res.status).toEqual(200);
  });
});
