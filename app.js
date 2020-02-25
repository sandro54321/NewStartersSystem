//bringing in the modules i need
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //allows me to get data from forms that have been submitted 
const cors = require('cors'); //allows me to make requests to the API from a different domain name (eliminates the need to use access control allow origin)
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')

//Connect To Database
mongoose.connect(config.database);

//When connected
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database)
})
mongoose.connection.on('error', (err) => {
    console.log('Database error:  ' + err)
})

//creating the app variable
const app = express();

const users = require('./routes/users');
const starters = require('./routes/starters');

//creating the port variable and defining the port
const port = 3000;

//enabling cors
app.use(cors());

//set static file
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//anything that is localhost/users/... will use the users route file
app.use('/users', users);
app.use('/starters', starters);

//creating a route to homepage (index route)
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

//starting the server
app.listen(port, () => {
    console.log("Server started on port: " + port);
});