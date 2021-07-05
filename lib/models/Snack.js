import pool from '../utils/pool.js';

export default class Snack {
  id;
  snackHeader;
  snackPrice;
  snackDescription;

  constructor(row) {
    this.id = row.id;
    this.snackHeader = row.snack_header;
    this.snackPrice = row.snack_price;
    this.snackDescription = row.snack_description;
  }

  static async insert({ snackHeader, snackPrice, snackDescription }) {
    const { rows } = await pool.query(
      `INSERT INTO snacks (
        snack_header,
        snack_price,
        snack_description
      ) VALUES ($1, $2, $3)
      RETURNING *`,
      [snackHeader, snackPrice, snackDescription]
    );
    return new Snack(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * 
      FROM snacks`);
    return rows.map((row) => new Snack(row));
  }

  static async update({ snackHeader, snackPrice, snackDescription }, id) {
    const { rows } = await pool.query(
      `
    UPDATE snacks
    SET 
    snack_header = $1,
    snack_price = $2,
    snack_description = $3
    WHERE
    id = $4
    RETURNING *`,
      [snackHeader, snackPrice, snackDescription, id]
    );
    return new Snack(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM snacks
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Snack(rows[0]);
  }
}
