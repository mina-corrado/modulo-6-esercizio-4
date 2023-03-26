const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')

//routes
const routesBlogPost = require('./routes/routes-blogpost');
const routesAutore = require('./routes/routes-autore');
const routesComment = require('./routes/routes-comment');

//middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routesBlogPost);
app.use(routesAutore);
app.use(routesComment);


app.use(logger);
app.use(errorHandler);

const start = async() => {
    try {
        await mongoose.connect('mongodb+srv://minacorrado:SW14D3KwA2WilPUH@cluster0.oopravd.mongodb.net/Epicode')
        app.listen(3000, ()=>{
            console.log("listening on port 3000")
        });    
    } catch (error) {
        console.log("error: ", error);    
    }
}

//avvio
start();