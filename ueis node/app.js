const express = require("express");
const cors = require("cors");
const path = require('path');
const {engine,create} = require('express-handlebars')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const hostname = "127.0.0.1"
const PORT = process.env.PORT || 3000;
const hbs = create({})
const app = express();

//middleware

app.use('/static',express.static('static'))

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.engine('handlebars', engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

hbs.handlebars.registerHelper('equals',(arg1,arg2,options) =>{
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})

hbs.handlebars.registerHelper('date',(arg1,arg2) =>{
  const moment = require('moment');
  return moment(arg1).format(arg2);
})
app.use(cors());

app.use(cookieParser());

app.use(sessions({
    name: 'ueisAuth',
    secret: 'randompassword',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
      secure: false,
    }
}));

//routes
app.get('/',(req,res) => {
    res.render('welcome',{layout:false})
})

app.use("/Admin",require("./routes/api/Admin"));

app.use("/Dashboard",require("./routes/api/Dashboard"));

app.use("/Auth",require("./routes/api/Auth"));

app.use("/identity",require("./routes/api/identity"));

app.use('/card',require("./routes/api/card"));

app.use('/service',require("./routes/api/service"));

app.use('/third',require("./routes/api/third"));

app.use('/test',require("./routes/api/Test"));

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
