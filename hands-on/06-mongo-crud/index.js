const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require('dotenv').config();
const MongoUtil = require('./MongoUtil.js')
// const { getDB, connect} = require('./MongoUtil.js)
// import in functions directly
// if we do that, then no need MongoUtil in front, can just those functions directly

const app = express();
app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// for forms to work
app.use(express.urlencoded({
    extended:false
}))

async function main() {
    // connect to mongodb first
    await MongoUtil.connect(process.env.MONGO_URI, 'animal_shelter_2');

    // SETUP THE ROUTES
    app.get('/', async function(req, res){
        const db = MongoUtil.getDB()
        let allAnimals = await db.collection('animals').find().toArray();
        res.render('all-animals.hbs', {
           animals: allAnimals 
        })
    })
    
    app.get('/animal/add', async function(req, res){
        res.render('add-animal.hbs', {

        })
    })

    app.post('/animal/add', async function(req, res){
        let {animalName, animalAge, animalType, animalGender, animalNotes} = req.body

        let db = MongoUtil.getDB();
        await db.collection('animals').insertOne({
            name: animalName,
            age: animalAge,
            type: animalType,
            gender: animalGender,
            notes: animalNotes
        });

        res.redirect('/')
    })
}

main();


app.listen(3000, function () {
    console.log("Server has started")
});