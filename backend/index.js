const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const routes = require('./routes/route');

const app = express();
connectDB();

/*
dot env structure:
-create .env file in root

add the following for now:

MONGODB_URI= "mongodb+srv://prakash:TqkQWuqT31lpt3a8@cluster0.5xdpaqf.mongodb.net/"
PORT= 8080


to run use : npm run dev
*/


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/',()=>{
    res.send("hello this is serverHome");
})