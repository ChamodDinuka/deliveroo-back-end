const express = require('express');
const bodyParser = require('body-parser');
const restaurantRoutes = require('./routes/Restaurant');
const userRoutes = require('./routes/User');
const authRoute = require('./routes/Auth');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'})
const app = express();

app.use('/api',bodyParser.json(),restaurantRoutes);
app.use('/api',bodyParser.json(),userRoutes);
app.use('/api',bodyParser.json(),authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`server running in ${PORT}`)})