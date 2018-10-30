DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    -- unique id for each product
    item_id INT NOT NULL AUTO_INCREMENT,
    --   name of the product
    product_name VARCHAR(300) NULL,
    -- name of the deparment the product is/will be in
    department_name VARCHAR(100) NULL,
    --   cost to the customer
    price DECIMAL(10,2) NULL,
    --   product currently available in stores
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

-- first row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oral-B Dual Clean Replacement Electric Toothbrush Replacement Brush Heads", "Beauty & Personal Care", 18.60, 300);

-- second row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Listerine Total Care Anticavity Mouthwash, 6 Benefit Fluoride Mouthwash for Bad Breath and Enamel Strength, Fresh Mint Flavor, 1L(Packaging may vary)", "Beauty & Personal Care", 5.07, 27);

-- third row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Earth Animal NO-hide Chicken Stix 90 Count Value Box", "Pet Supplies", 60.54, 7);

-- fourth row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silicone Stretch Lids, LUSEXO 6-Pack Various Sizes Food Saver Covers, Reusable, Durable and Flexible Food Covers, Keeping Food Fresh, Suit for Oven or Fridge", "Home & Kitchen", 5.99, 1);

-- fifth row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("3-Pack Plant Self Watering Globes Automatic Hand-blown Glass Watering Bulbs Mini Decorative Design, Bird, Mushroom, Snail", "Patio, Lawn & Garden", 18.99, 1);

-- sixth row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charmin Ultra Strong Toilet Paper, Family Mega Roll with Clean Touch(5X More Sheets)", "Health & Household", 25.49, 25);

-- seventh row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("USB C Power Bank RAVPower 10000mAh Portable Charger, Ultra-Slim 10000 Phone Charger with 5V/3A Type-C Port Power Pack Battery Pack for Nintendo Switch, Galaxy S8, Google Pixel 2, iPhone, iPad and More", "Cell Phones & Accessories", 36.99, 1);

-- eigth row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("50 Ways to Kill a Slug", "Books", 7.99, 8);

-- nineth row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("2 x 2oz Sina Ginger Candy Make Easy Ginger Tea", "Grocery and Gourmet Food", 7.08, 12);

-- tenth row
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweese 1106 Porcelain Bowls - 10 Ounce for Ice Cream Dessert, Small Side Dishes - Set of 6, White", "Home & Kitchen", 18.99, 1);

-- the mock products above have been taken from amazon live listings