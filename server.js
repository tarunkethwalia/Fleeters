const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const demandRoute = require('./routes/demandRoute');
const consignerRoute =require('./routes/consignerRoute');
const laneRoute = require('./routes/laneRoute');
const env = require('./environment/env').env;
const moment =require('moment');

mongoose.connect(process.env.MongoUrl || env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
    console.log("Mongo Connection Successful.")
}).catch(err => console.error(err));

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', demandRoute);
app.use('/api', consignerRoute);
app.use('/api', laneRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});

