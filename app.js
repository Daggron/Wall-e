const express = require('express');
const app = express();
const expressSession = require('express-session');
require('dotenv/config');
const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));


app.use(expressSession({
    secret:'A keyboard Cat',
    saveUninitialized:true,
    resave:true
}));

app.use('/',require('./routes/users'));

const port = process.env.PORT || 8000 ;

app.listen(port,()=>{
    console.log(`Server at port ${port}`);
});