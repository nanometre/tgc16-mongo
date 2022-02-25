const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on')
require('dotenv').config();
require('dotenv').config();
const {
    connect,
    getDB
} = require('./MongoUtil');
// when using require, ./ is required if you want to access a specific folder. 
// otherwise require will look into node_modules folder

// Bring in the mongoclient
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

async function main() {
    // connect to the mongodb
    // first arg of the MongoClient.connect() is the URI (or your connection string)
    await connect(process.env.MONGO_URI, "sample_airbnb")

    // SETUP ROUTES
    app.get('/', async function (req, res) {
        const data = await getDB().collection('listingsAndReviews') // select the listingsAndReviews collection
            .find({})
            .limit(10)
            .toArray(); // find all documents

        res.send(data);
    })
}

main();


app.listen(3000, function () {
    console.log("Server has started")
});