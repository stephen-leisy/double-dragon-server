import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Cocktail from '../lib/models/Cocktail';
import Main from '../lib/models/Main';
import Snack from '../lib/models/Snack';
import Salad from '../lib/models/Salad';

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

describe('main routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('posts a new menu item', async () => {
    const bahnMi = {
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    };

    const newShit = await request(app).post('/api/v1/mains').send(bahnMi);

    expect(newShit.body).toEqual({
      id: '1',
      addOnOne: null,
      addOnPrice: null,
      addOnPriceTwo: null,
      addOnTwo: null,
      choiceFour: null,
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    });
  });

  it('updates a menu item', async () => {
    const newItem = await Main.insert({
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    });

    const res = await request(app).put(`/api/v1/mains/${newItem.id}`).send({
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
      addOnOne: 'bayyyyycon',
      addOnPrice: 2,
    });

    expect(res.body).toEqual({
      id: '1',
      addOnOne: 'bayyyyycon',
      addOnPrice: 2,
      addOnPriceTwo: null,
      addOnTwo: null,
      choiceFour: null,
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    });
  });

  it('it returns all items', async () => {
    await Main.insert({
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    });
    await Main.insert({
      foodHeader: 'RICE BOWL',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    });
    const res = await request(app).get('/api/v1/mains');

    expect(res.body).toEqual([
      {
        id: '1',
        addOnOne: null,
        addOnPrice: null,
        addOnPriceTwo: null,
        addOnTwo: null,
        choiceFour: null,
        foodHeader: 'BANH MI',
        foodPrice: 12,
        foodDescription:
          'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
        subHeader: 'WITH YOUR CHOICE OF...',
        choiceOne: 'PORK BELLY: fish sauce, pineapple',
        choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
        choiceThree: 'SOY CURLS: thai chili, orange, ginger',
      },
      {
        id: '2',
        addOnOne: null,
        addOnPrice: null,
        addOnPriceTwo: null,
        addOnTwo: null,
        choiceFour: null,
        foodHeader: 'RICE BOWL',
        foodPrice: 12,
        foodDescription:
          'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
        subHeader: 'WITH YOUR CHOICE OF...',
        choiceOne: 'PORK BELLY: fish sauce, pineapple',
        choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
        choiceThree: 'SOY CURLS: thai chili, orange, ginger',
      },
    ]);
  });

  it('deletes an item from existence', async () => {
    const newFood = await Main.insert({
      foodHeader: 'BANH MI',
      foodPrice: 12,
      foodDescription:
        'pickled carrot & daikon, sambal aioli*, jalapeno puree, cilantro, baguette',
      subHeader: 'WITH YOUR CHOICE OF...',
      choiceOne: 'PORK BELLY: fish sauce, pineapple',
      choiceTwo: 'CHICKEN: garlic, shallots, black vinegar',
      choiceThree: 'SOY CURLS: thai chili, orange, ginger',
    });

    const res = await request(app).delete(`/api/v1/mains/${newFood.id}`);
    expect(res.body).toEqual({ success: 'that shit is deleted' });
    expect(res.status).toEqual(200);
  });
});

describe('snack routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('posts a new snack', async () => {
    const snack = {
      snackHeader: 'Fries',
      snackPrice: 4,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    };

    const newShit = await request(app).post('/api/v1/snacks').send(snack);

    expect(newShit.body).toEqual({
      id: '1',
      snackHeader: 'Fries',
      snackPrice: 4,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    });
  });

  it('it returns all snacks', async () => {
    await Snack.insert({
      snackHeader: 'Fries',
      snackPrice: 4,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    });
    await Snack.insert({
      snackHeader: 'HOUSE KIMCHI (gf)',
      snackPrice: 3,
    });
    const res = await request(app).get('/api/v1/snacks');

    expect(res.body).toEqual([
      {
        id: '1',
        snackHeader: 'Fries',
        snackPrice: 4,
        snackDescription: 'skinny, with sambal aioli* (GF)',
      },
      {
        id: '2',
        snackHeader: 'HOUSE KIMCHI (gf)',
        snackPrice: 3,
        snackDescription: null,
      },
    ]);
  });

  it('updates a snack', async () => {
    const newSnack = await Snack.insert({
      snackHeader: 'Fries',
      snackPrice: 4,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    });

    const res = await request(app).put(`/api/v1/snacks/${newSnack.id}`).send({
      snackHeader: 'Fries',
      snackPrice: 5,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    });

    expect(res.body).toEqual({
      id: '1',
      snackHeader: 'Fries',
      snackPrice: 5,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    });
  });

  it('deletes a snack from existence', async () => {
    const newSnack = await Snack.insert({
      snackHeader: 'Fries',
      snackPrice: 5,
      snackDescription: 'skinny, with sambal aioli* (GF)',
    });

    const res = await request(app).delete(`/api/v1/snacks/${newSnack.id}`);
    expect(res.body).toEqual({ success: 'that shit is deleted' });
    expect(res.status).toEqual(200);
  });
});

describe('salad days', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('posts a new salad', async () => {
    const dansNewSalad = {
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 10,
    };

    const newShit = await request(app)
      .post('/api/v1/salads')
      .send(dansNewSalad);

    expect(newShit.body).toEqual({
      id: '1',
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 10,
      saladAddOn: null,
      saladAddOnPrice: null,
    });
  });

  it('it returns all salads', async () => {
    await Salad.insert({
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 10,
    });
    await Salad.insert({
      saladHeader: 'SECOND BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 10,
    });
    const res = await request(app).get('/api/v1/salads');

    expect(res.body).toEqual([
      {
        id: '1',
        saladHeader: 'WAKAME BEET',
        saladDescription:
          'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
        saladPrice: 10,
        saladAddOn: null,
        saladAddOnPrice: null,
      },
      {
        id: '2',
        saladHeader: 'SECOND BEET',
        saladDescription:
          'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
        saladPrice: 10,
        saladAddOn: null,
        saladAddOnPrice: null,
      },
    ]);
  });

  it('updates a salad', async () => {
    const newSalad = await Salad.insert({
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 10,
    });

    const res = await request(app).put(`/api/v1/salads/${newSalad.id}`).send({
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 11,
      saladAddOn: 'chicken',
      saladAddOnPrice: 3,
    });

    expect(res.body).toEqual({
      id: '1',
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 11,
      saladAddOn: 'chicken',
      saladAddOnPrice: 3,
    });
  });

  it('deletes a salad from existence', async () => {
    const newSalad = await Salad.insert({
      saladHeader: 'WAKAME BEET',
      saladDescription:
        'chioga beets, fava beans, wakame, sunflower seeds, queso fresco, sherry vinaigrette (gf)',
      saladPrice: 10,
    });

    const res = await request(app).delete(`/api/v1/salads/${newSalad.id}`);
    expect(res.body).toEqual({ success: 'that shit is deleted' });
    expect(res.status).toEqual(200);
  });
});
