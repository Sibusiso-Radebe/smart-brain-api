const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const profile = require('./controllers/Profile');
const image = require('./controllers/Image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smart-brain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=>{	res.send('it is working')});
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res ) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', ( req, res) => { profile.handleProfileGet(req, res , db)})
app.put('/image', (req, res ) => { image.handleImage(req, res, db ) } )
app.post('/imageUrl', (req, res ) => { image.handleApiCall(req, res ) } )

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})

