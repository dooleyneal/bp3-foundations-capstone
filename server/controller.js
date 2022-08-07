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
        
        CREATE TABLE groceries (
            grocery_id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL,
            department VARCHAR NOT NULL,
            size VARCHAR NOT NULL,
            price FLOAT NOT NULL,
            image_url VARCHAR
        );

        INSERT INTO groceries (name, department, size, price, image_url)
        VALUES ('Eggs', 'Dairy', 'Large 12-Count', 1.99, 'https://t3.ftcdn.net/jpg/00/85/71/68/360_F_85716836_UtqykRKQ7Fiyn3IIH7cqd9Jn3NHxC1MW.jpg'),
        ('Milk Skim', 'Dairy', '1 Gallon', 3.85, 'https://t3.ftcdn.net/jpg/04/05/56/96/360_F_405569603_Zd5sF9JgDQSUgDAWSeXmAAAQPuAUL6bl.jpg'),
        ('Shredded Cheddar Cheese', 'Dairy', '12 oz', 3.85, 'https://thumbs.dreamstime.com/b/shredded-cheese-18211822.jpg'),
        ('Greek Yogurt Plain', 'Dairy', '28 oz', 5.99, 'https://c8.alamy.com/comp/2G473YX/metal-spoon-with-fresh-white-organic-greek-yoghurt-on-white-background-2G473YX.jpg'),
        ('Butter', 'Dairy', '32 tbsp', 2.99, 'https://image.shutterstock.com/image-illustration/butter-doodle-illustration-260nw-394945660.jpg'),
        ('Ice Cream Vanilla', 'Frozen', '1 Gallon', 7.99, 'https://static.vecteezy.com/system/resources/previews/007/517/445/original/sweet-cold-dessert-vanilla-ice-cream-in-a-striped-glass-with-a-spoon-cartoon-illustration-on-a-white-background-vector.jpg'),
        ('Frozen Cauliflower', 'Frozen', '28 oz', 5.99, 'https://c8.alamy.com/comp/2BWYT16/cauliflower-a-cartoon-illustration-of-cauliflower-2BWYT16.jpg'),
        ('Waffles', 'Frozen', '12-Count', 6.47, 'https://media.istockphoto.com/vectors/cartoon-breakfast-waffle-vector-id1145689828'),
        ('Pepperoni Pizza', 'Frozen', '12 in', 8.99, https://ctl.s6img.com/society6/img/eXf3XLpZwdHAuiDgWrkDt0cbogc/w_1500/prints/~artwork/s6-original-art-uploads/society6/uploads/misc/f63b914fb39d4cf6b3ad3d20a600d020/~~/pizza-cartoon-prints.jpg'),
        ('Frozen Garlic Bread', 'Frozen', '12-Count', 6.99, 'https://st2.depositphotos.com/1411573/7441/v/950/depositphotos_74417171-stock-illustration-garlic-bread.jpg'),
        ('Apples', 'Produce', '1-Count', 1.25, 'https://media.istockphoto.com/vectors/cute-bright-red-apple-icon-isolated-on-white-vector-id90692172?k=20&m=90692172&s=612x612&w=0&h=J_mkAAYYinvK1EfuD772Z8u10N41xDlNV0Tvbgo0AVE='),
        ('Carrots', 'Produce', '1-Count', 2.25, 'https://www.pngitem.com/pimgs/m/111-1116017_clipart-of-a-carrot-transparent-cartoons-transparent-background.png'),
        ('Watermelon', 'Produce', '1-Count', 6.99, 'https://w7.pngwing.com/pngs/588/309/png-transparent-watermelon-fruit-drawing-cartoon-watermelon-food-melon-superfood.png'),
        ('Iceberg Lettuce', 'Produce', '1-Count', 1.65, 'https://media.istockphoto.com/illustrations/illustration-of-the-lettuce-illustration-id479845524?k=20&m=479845524&s=612x612&w=0&h=-yc5rGjYK_hqrvFCWvY2QExi7_yiw7enRnls7BQBAzw='),
        ('Pineapple', 'Produce', '1-Count', 2.25, 'https://freepngimg.com/save/21933-cartoon-pineapple-clip-art/1229x1229'),
        ('Spaghetti Noodles', 'Grocery', '1 lb', 2.20, 'https://thumbs.dreamstime.com/z/dish-which-wheat-spaghetti-red-sauce-main-dish-vegetarian-vegetarian-dishes-single-icon-cartoon-style-vector-symbol-88004644.jpg'),
        ('Sugar', 'Grocery', '4 lbs', 5.99, 'https://static.vecteezy.com/system/resources/previews/005/483/180/original/sugar-in-an-open-canvas-bag-white-sugar-packaging-cartoon-style-vector.jpg'),
        ('Tortilla Chips', 'Grocery', '12 oz', 4.69, 'https://t4.ftcdn.net/jpg/02/12/95/33/360_F_212953322_4JtABgkGl1218MlB3CCWbgDQP8sGDlI7.jpg'),
        ('Ketchup', 'Grocery', '32 oz', 4.79, 'https://image.shutterstock.com/image-vector/vector-cartoon-red-plastic-bottle-260nw-350148722.jpg'),
        ('White Rice', 'Grocery', '32 oz', 2.79, 'https://media.istockphoto.com/vectors/rice-bowl-vector-id547231286?k=20&m=547231286&s=612x612&w=0&h=louCvHv6Jraoxj1NI0VjqR2BJ7QTYDz2o209mcck2is='),
        ('Hot Dogs', 'Meat', '16 oz', 3.69, 'https://image.shutterstock.com/image-vector/hotdog-vector-illustration-menus-brochure-260nw-1712906251.jpg'),
        ('Turkey', 'Meat', '15 lbs', 40.35, 'https://st4.depositphotos.com/24038622/27074/v/1600/depositphotos_270742354-stock-illustration-roast-turkey-dinner-cartoon-illustration.jpg'),
        ('Salmon', 'Meat', '1 lb', 12.99, 'https://e7.pngegg.com/pngimages/21/241/png-clipart-sockeye-salmon-fish-cute-salmon-s-food-orange.png'),
        ('Chicken Nuggets', 'Meat', '32 oz' 8.99, 'https://thumbs.dreamstime.com/z/nuggetboxstalo-174963252.jpg'),
        ('Top Serloin Steak', 'Meat', '1 lb', 13.99, 'https://previews.123rf.com/images/blamb/blamb1407/blamb140700834/29643262-a-thick-cartoon-steak-ready-to-be-cooked-.jpg');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
        },

    getGroceries: (req, res) => {
        sequelize.query(`
        SELECT grocery_id, name FROM groceries;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
    }
}

    