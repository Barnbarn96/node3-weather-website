const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Barnabas Soh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Barnabas Soh'
    }) 
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        message: 'For more information, please contact me at Barnabassoh96@gmail.com',
        name: 'Barnabas  Soh'
    }) 
})

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
      })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Barnabas',
        errorMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Barnabas',
        errorMsg: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})