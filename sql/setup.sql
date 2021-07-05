-- DROP TABLE IF EXISTS cocktails, mains, snacks, salads;


CREATE TABLE cocktails (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cocktail_name TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  cocktail_price INT NOT NULL,
  cocktail_ingredients TEXT NOT NULL
);

CREATE TABLE mains (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  food_header TEXT NOT NULL,
  food_price INT NOT NULL,
  food_description TEXT NOT NULL,
  sub_header TEXT,
  choice_one TEXT,
  choice_two TEXT,
  choice_three TEXT,
  choice_four TEXT,
  add_on_one TEXT,
  add_on_price INT,
  add_on_two TEXT,
  add_on_price_two INT
);

CREATE TABLE snacks (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  snack_header TEXT NOT NULL,
  snack_price INT NOT NULL,
  snack_description TEXT
);

CREATE TABLE salads (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  salad_header TEXT NOT NULL,
  salad_price INT NOT NULL,
  salad_description TEXT,
  salad_add_on TEXT,
  salad_add_on_price INT
);

