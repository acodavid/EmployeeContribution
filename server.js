const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('cors');

// routes
const users = require('./routes/api/users');
const preferences = require('./routes/api/preferences');
const presenceAbsenceBusinessTrip = require('./routes/api/presenceAbsenceBusinessTrip');

const path = require('path');

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
app.use('/api/presence/absence', presenceAbsenceBusinessTrip)

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/dist/client'));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
// }

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

