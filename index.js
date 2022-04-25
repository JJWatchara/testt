const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser'); 
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(expressSession({ resave: false ,secret: '123456' , saveUninitialized: true}));
app.use(express.static(__dirname + '/www'));


// app.use(express.json());
// app.use(expressSession({
//   secret: 'Jujunaa, because this a secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { }
// }))

mongoose.connect('mongodb://localhost:27017/me_tang', { useNewUrlParser: true, useUnifiedTopology: true })
.then( () => console.log("database successfully connected") )
.catch( (err) => { console.log("Could not connect to database : " + err); /*process.exit(1)*/ } );
mongoose.set('debug', true);

//! use router 
app.use('/', require('./src/routes'));




app.listen(3000, () => {
  console.log('Application is running on port 3000');
});