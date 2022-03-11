
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpCamp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("CONNECTED TO DATABASE");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const campground = new Campground({
            author: '6217e51956bc14d6418850b8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa modi repudiandae omnis dolor rerum, ullam unde quasi repellendus enim sed itaque illo nobis aperiam. Rem sequi quisquam commodi eveniet soluta!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dr6tsuxmc/image/upload/v1646178171/lwxxuq6dh0st33hifgsy.jpg',
                  filename: 'lwxxuq6dh0st33hifgsy'
                },
                {
                  url: 'https://res.cloudinary.com/dr6tsuxmc/image/upload/v1646178171/ayvxiap3icgotn9gsirx.jpg',
                  filename: 'ayvxiap3icgotn9gsirx'
                }
              ]
        });
        await campground.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})