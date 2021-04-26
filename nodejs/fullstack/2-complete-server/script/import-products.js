const db = require('../db');
const Products = require('../models/products');

const products = require('../products.json');

(async function () {
    for (let i = 0; i < products.length; i++) {
        try {
            console.log(await Products.create(products[i]));
        } catch (err) {
            console.error(err);
        }
    }
    db.disconnect();
})();