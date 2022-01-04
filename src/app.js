const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirectory))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Masada Systems'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Masada',
        name: 'Masada Systems'
    })
})


app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Topics are Below',
        message: 'This is where you can go to find help',
        name: 'Masada Systems'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Masada Systems',
        errorMessage: 'Help Page Not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Masada Systems',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('server started on 3000')
})