require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require("path");

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL.replace(
            '<password>',
            process.env.DATABASE_PASSWORD
        );
let PORT = process.env.PORT || 3000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Thư mục views nằm cùng cấp với file server.js
app.set('view engine', 'jade'); // Sử dụng jade làm view engine

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose
    .connect(connUri, { 
        useNewUrlParser: true , 
        useCreateIndex: true, 
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'));
/*
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB --  database connection established successfully!');
    console.log('----------------------------------------------------------');
});
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    console.log('----------------------------------------------------------');
    process.exit();
});
*/
//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);
require('./config/passport')(passport);

//=== 4 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);


//=== 5 - START SERVER
app.listen(PORT, () => console.log('Connected to MongoDB Server, WebService running on port '+PORT));

// Start the server on port 3000
/*app.listen(process.env.PORT || 3000,()=>{
    console.log('Connected to MongoDB Server, WebService running on port 3000');
})
*/