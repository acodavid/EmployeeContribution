const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('cors');

// routes
const users = require('./routes/api/users');
const preferences = require('./routes/api/preferences');
const presenceAbsenceBusinessTrip = require('./routes/api/presenceAbsenceBusinessTrip');
const holidays = require('./routes/api/holidays');
const positions = require('./routes/api/positions');
const absenceType = require('./routes/api/absencesType');

const app = express();

app.use(cors())

// variables
const mongoDB = require('./config/keys').mongoDBConnectionString;
const PORT = process.env.PORT || 5000;

// Express v4.16.0 and higher // without body-parser
// when you submit a for, or something like that, you can grab the data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))



// MongoDB database configuration
mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB is connected'))
    .catch(error => console.log(error))

// passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);



// use routes
app.use('/api/users', users);
app.use('/api/preferences', preferences);
app.use('/api/presence/absence', presenceAbsenceBusinessTrip);
app.use('/api/holidays', holidays);
app.use('/api/positions', positions);
app.use('/api/absence/type', absenceType);

app.enable('trust proxy');

app.use (function (req, res, next) {
    if (req.secure) {
            // request was via https, so do no special handling
            next();
    } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    }
});
  
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

