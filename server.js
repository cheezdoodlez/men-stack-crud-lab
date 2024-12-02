const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()

mongoose.connect(process.env.MONGODB_URI)

const Cat = require('./models/cats.js');
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))
// app.use(morgan('dev'))

//homepage
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

// posts to list on website, this is list
app.get('/cats', async (req, res) =>{
    const allCats = await Cat.find()
    res.render('cats/c-index.ejs', { cats : allCats})        
})
// Create page w form
app.get('/cats/new', (req, res) => {
    res.render('cats/new.ejs')
})

//show page for specific cat

app.get('/cats/:catId', async (req, res)=> {
    const foundCat = await Cat.findById(req.params.catId)
    res.render('cats/show.ejs', { cat : foundCat})
})

// Posts to mongo now
app.post('/cats', async (req, res) => {
    if (req.body.isSleepyGuy === 'on'){
        req.body.isSleepyGuy = true
    } else {
        req.body.isSleepyGuy = false
    }
    await Cat.create(req.body)
    res.redirect('/cats')
})

//delete route

app.delete('/cats/:catId', async (req, res) => {
    await Cat.findByIdAndDelete(req.params.catId)
    res.redirect('/cats')
})

// edit 

app.get('/cats/:catId/edit', async (req, res) =>{
    const foundCat = await Cat.findById(req.params.catId)
    res.render('cats/edit.ejs', {
        cat: foundCat,
    })
})

//update

app.put('/cats/:catId', async (req, res) => {
    if (req.body.isSleepyGuy === 'on'){
        req.body.isSleepyGuy = true
    } else {
        req.body.isSleepyGuy = false
    }
    await Cat.findByIdAndUpdate(req.params.catId, req.body)
    res.redirect(`/cats/${req.params.catId}`)
})
 app.listen(3002, () => {
    console.log ('Listening on port 3002')
 })