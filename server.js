const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'tecate6698',
      database : 'smartbrain'
    }
});

database.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('working');
})

app.post('/signin', (req, res) => signIn.handleSignIn(req, res, database, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, database, bcrypt))

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, database))

app.put('/image', (req, res) => image.handleImage(req, res, database))

app.listen(4000);

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/