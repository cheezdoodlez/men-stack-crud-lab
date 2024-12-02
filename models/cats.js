const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    dangerLevel: Number,
    isSleepyGuy: Boolean
})

const Cat = mongoose.model('Cat', catSchema)

module.exports = Cat;