import pool from '../utils/pool.js';

export default class Salad {
  id;
  saladHeader;
  saladPrice;
  saladDescription;
  saladAddOn;
  saladAddOnPrice;

  constructor(row) {
    this.id = row.id;
    this.saladHeader = row.salad_header;
    this.saladPrice = row.salad_price;
    this.saladDescription = row.salad_description;
    this.saladAddOn = row.salad_add_on;
    this.saladAddOnPrice = row.salad_add_on_price;
  }

  static async insert({
    saladHeader,
    saladPrice,
    saladDescription,
    saladAddOn,
    saladAddOnPrice,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO salads (
        salad_header,
        salad_price,
        salad_description,
        salad_add_on,
        salad_add_on_price
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [saladHeader, saladPrice, saladDescription, saladAddOn, saladAddOnPrice]
    );
    return new Salad(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * 
      FROM salads`);
    return rows.map((row) => new Salad(row));
  }

  static async update(
    { saladHeader, saladPrice, saladDescription, saladAddOn, saladAddOnPrice },
    id
  ) {
    const { rows } = await pool.query(
      `
      UPDATE salads
      SET 
      salad_header = $1,
      salad_price = $2,
      salad_description = $3,
      salad_add_on = $4,
      salad_add_on_price = $5
      WHERE
      id = $6
      RETURNING *`,
      [
        saladHeader,
        saladPrice,
        saladDescription,
        saladAddOn,
        saladAddOnPrice,
        id,
      ]
    );
    return new Salad(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM salads
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Salad(rows[0]);
  }
}
