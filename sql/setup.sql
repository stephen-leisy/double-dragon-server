DROP TABLE IF EXISTS cocktails;

CREATE TABLE cocktails (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cocktail_name TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  cocktail_price INT NOT NULL,
  cocktail_ingredients TEXT NOT NULL
)