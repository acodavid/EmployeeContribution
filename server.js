const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const cors = require('cors');

const https = require('https');
const http = require('http');

const fs = require('fs');

// routes
const users = require('./routes/api/users');
const preferences = require('./routes/api/preferences');
const presenceAbsenceBusinessTrip = require('./routes/api/presenceAbsenceBusinessTrip');
const holidays = require('./routes/api/holidays')

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
app.use('/api/holidays', holidays)

app.get('/', function (req, res) {
    res.send('working')
  })


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ect.sevenlab.org/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ect.sevenlab.org/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ect.sevenlab.org/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app)
  
// app.listen(PORT, () => {
//     console.log(`Server started at port ${PORT}`);
// });

httpServer.listen(5000, () => {
    console.log('HTTP Server running on port 5000');
});

httpsServer.listen(5001, () => {
    console.log('HTTPS Server running on port 5001');
});

