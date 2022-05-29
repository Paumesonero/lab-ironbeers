const express = require('express');
const { engine } = require('express/lib/application');

const hbs = require('hbs');
const async = require('hbs/lib/async');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// hbs

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')


app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

//app.set("view engine", 'hbs')

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const apiBeers = await punkAPI.getBeers();
    const firstTwentyFive = apiBeers.slice(0, 25)
    res.render('beers', { firstTwentyFive });
    //console.log(firstTwentyFive)
  } catch (error) {
    //console.log(error)
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom()
    res.render('randomBeer', { randomBeer });
    console.log(randomBeer)
  } catch (error) {

  }

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
