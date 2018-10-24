const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`;

  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log ('unable to write to server log');
    }
  });

  next();
});

/*
app.use((req,res,next) => {
  res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname + '/public'));

app.get ('/',(req,res) => {
  //res.send ('<h1>Hello Express</h1>');

  res.render('home.hbs',
  {
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to my website'
  });

//  res.send ({
//    name: 'Andrew',
//    likes: ['Bikes','Cars']
//  });

});

  app.get ('/about',(req,res) => {
    res.render('about.hbs',
    {
      pageTitle: 'About Page'
    });
    //res.send ('<h1>About Us Section</h1>');
  });

  app.get ('/bad',(req,res) => {
    res.send ({
      errorMessage:'Unable to handle request'
    });
  });

app.listen (3000, () => {
  console.log ('Server is up');
});
