import pool from '../utils/pool.js';

export default class Cocktail {
  id;
  cocktailName;
  iconUrl;
  cocktailPrice;
  cocktailIngredients;

  constructor(row) {
    this.id = row.id;
    this.cocktailName = row.cocktail_name;
    this.iconUrl = row.icon_url;
    this.cocktailPrice = row.cocktail_price;
    this.cocktailIngredients = row.cocktail_ingredients;
  }

  static async insert({
    cocktailName,
    iconUrl,
    cocktailPrice,
    cocktailIngredients,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO cocktails (
        cocktail_name,
        icon_url,
        cocktail_price,
        cocktail_ingredients
      ) VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [cocktailName, iconUrl, cocktailPrice, cocktailIngredients]
    );
    return new Cocktail(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * 
      FROM cocktails`);
    return rows.map((row) => new Cocktail(row));
  }

  static async update(
    { cocktailName, iconUrl, cocktailPrice, cocktailIngredients },
    id
  ) {
    const { rows } = await pool.query(
      `
      UPDATE cocktails
      SET    
      cocktail_name = $1,
      icon_url = $2,
      cocktail_price = $3,
      cocktail_ingredients = $4
      WHERE 
      id = $5
      RETURNING *
      `,
      [cocktailName, iconUrl, cocktailPrice, cocktailIngredients, id]
    );
    return new Cocktail(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM cocktails
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Cocktail(rows[0]);
  }
}
