const express = require('express');
const api_routes = require('./routes/api/api')
const navigate_routes = require('./routes/navigate/navigate')
const hbs = require('hbs');
const path = require('path');
const mainView = require('./routes/views/js/view');

global.localStorage = [];

const app = express();
app.use(express.json());

app.set('views', __dirname + '/routes/views/html');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', mainView.render);
app.use('/api', api_routes);
app.use('/navigate', navigate_routes);

// if we reach this point no route answered to the petition
app.use((req, res, next) => {
    res.render('500');
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b)
        return opts.fn(this);
    else
        return opts.inverse(this);
});

module.exports = app;