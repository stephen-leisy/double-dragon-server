import pool from '../utils/pool.js';

export default class Main {
  id;
  foodHeader;
  foodPrice;
  foodDescription;
  subHeader;
  choiceOne;
  choiceTwo;
  choiceThree;
  choiceFour;
  addOnOne;
  addOnPrice;
  addOnTwo;
  addOnPriceTwo;

  constructor(row) {
    this.id = row.id;
    this.foodHeader = row.food_header;
    this.foodPrice = row.food_price;
    this.foodDescription = row.food_description;
    this.subHeader = row.sub_header;
    this.choiceOne = row.choice_one;
    this.choiceTwo = row.choice_two;
    this.choiceThree = row.choice_three;
    this.choiceFour = row.choice_four;
    this.addOnOne = row.add_on_one;
    this.addOnPrice = row.add_on_price;
    this.addOnTwo = row.add_on_two;
    this.addOnPriceTwo = row.add_on_price_two;
  }

  static async insert({
    foodHeader,
    foodPrice,
    foodDescription,
    subHeader,
    choiceOne,
    choiceTwo,
    choiceThree,
    choiceFour,
    addOnOne,
    addOnPrice,
    addOnTwo,
    addOnPriceTwo,
  }) {
    const { rows } = await pool.query(
      `INSERT INTO mains (
  food_header,
  food_price,
  food_description,
  sub_header,
  choice_one,
  choice_two,
  choice_three,
  choice_four,
  add_on_one,
  add_on_price,
  add_on_two,
  add_on_price_two
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        foodHeader,
        foodPrice,
        foodDescription,
        subHeader,
        choiceOne,
        choiceTwo,
        choiceThree,
        choiceFour,
        addOnOne,
        addOnPrice,
        addOnTwo,
        addOnPriceTwo,
      ]
    );
    return new Main(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * 
      FROM mains`);
    return rows.map((row) => new Main(row));
  }

  static async update(
    {
      foodHeader,
      foodPrice,
      foodDescription,
      subHeader,
      choiceOne,
      choiceTwo,
      choiceThree,
      choiceFour,
      addOnOne,
      addOnPrice,
      addOnTwo,
      addOnPriceTwo,
    },
    id
  ) {
    const { rows } = await pool.query(
      `UPDATE mains
      SET
      food_header = $1,
      food_price = $2,
      food_description = $3,
      sub_header = $4,
      choice_one = $5,
      choice_two = $6,
      choice_three = $7,
      choice_four = $8,
      add_on_one = $9,
      add_on_price = $10,
      add_on_two = $11,
      add_on_price_two = $12
      WHERE
      id = $13
      RETURNING *`,
      [
        foodHeader,
        foodPrice,
        foodDescription,
        subHeader,
        choiceOne,
        choiceTwo,
        choiceThree,
        choiceFour,
        addOnOne,
        addOnPrice,
        addOnTwo,
        addOnPriceTwo,
        id,
      ]
    );
    return new Main(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM mains
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Main(rows[0]);
  }
}
