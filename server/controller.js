require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS groceries;
        DROP TABLE IF EXISTS grocery_lists;
        
CREATE TABLE groceries (
  grocery_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  department VARCHAR NOT NULL,
  size VARCHAR NOT NULL,
  price FLOAT NOT NULL
  );

INSERT INTO groceries (name, department, size, price)
  VALUES ('Eggs', 'Dairy', 'Large 12-Count', 1.99),
  ('Milk Skim', 'Dairy', '1 Gallon', 3.85),
  ('Shredded Cheddar Cheese', 'Dairy', '12 oz', 3.85),
  ('Greek Yogurt Plain', 'Dairy', '28 oz', 5.99),
  ('Butter', 'Dairy', '32 tbsp', 2.99),
  ('Ice Cream Vanilla', 'Frozen', '1 Gallon', 7.99),
  ('Frozen Cauliflower', 'Frozen', '28 oz', 5.99),
  ('Waffles', 'Frozen', '12-Count', 6.47),
  ('Pepperoni Pizza', 'Frozen', '12 in', 8.99),
  ('Frozen Garlic Bread', 'Frozen', '12-Count', 6.99),
  ('Apples', 'Produce', '1-Count', 1.25),
  ('Carrots', 'Produce', '1-Count', 2.25),
  ('Watermelon', 'Produce', '1-Count', 6.99),
  ('Iceberg Lettuce', 'Produce', '1-Count', 1.65),
  ('Pineapple', 'Produce', '1-Count', 2.25),
  ('Spaghetti Noodles', 'Grocery', '1 lb', 2.20),
  ('Sugar', 'Grocery', '4 lbs', 5.99),
  ('Tortilla Chips', 'Grocery', '12 oz', 4.69),
  ('Ketchup', 'Grocery', '32 oz', 4.79),
  ('White Rice', 'Grocery', '32 oz', 2.79),
  ('Hot Dogs', 'Meat', '16 oz', 3.69),
  ('Turkey', 'Meat', '15 lbs', 40.35),
  ('Salmon', 'Meat', '1 lb', 12.99),
  ('Chicken Nuggets', 'Meat', '32 oz', 8.99),
  ('Top Serloin Steak', 'Meat', '1 lb', 13.99);

  CREATE TABLE grocery_lists (
    list_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
  );
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
        },

    getLists: (req, res) => {
        sequelize.query(`
        SELECT * FROM grocery_lists;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },

    getGroceries: (req, res) => {
        sequelize.query(`
        SELECT * FROM groceries;
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    displayLists: (req, res) => {
        sequelize.query(`
        SELECT * FROM grocery_lists;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },

    displayListItems: (req, res) => {
        const {name} = req.body.data
        sequelize.query(`
        SELECT grocery_id, name, department, size, price FROM groceries
        WHERE ${name} = TRUE
        ORDER BY department;
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    createNewList: (req, res) => {
        const {name} = req.body
        sequelize.query(`
        INSERT INTO grocery_lists (name)
        VALUES ('${name}');

        ALTER TABLE groceries
        ADD COLUMN ${name} BOOLEAN;

        ALTER TABLE groceries
        ALTER COLUMN ${name} SET DEFAULT FALSE;

        UPDATE groceries
        SET ${name} = FALSE;
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    deleteList: (req, res) => {
        const {name} = req.body
        sequelize.query(`
        DELETE FROM grocery_lists
        WHERE list_id = ${req.params.id};

        ALTER TABLE groceries
        DROP COLUMN ${name};
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    addToList: (req, res) => {
        const {name} = req.body.data
        const {id} = req.params
        sequelize.query(`
        UPDATE groceries
        SET ${name} = TRUE
        WHERE grocery_id = ${id};
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },

    deleteItem:(req, res) => {
        const {name} = req.body.data
        const {id} = req.params
        sequelize.query(`
        UPDATE groceries
        SET ${name} = FALSE
        WHERE grocery_id = ${id};
        `).then(dbRes => res.status(200).send(dbRes[0]))
    }

}




    