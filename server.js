const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const demandRoute = require('./routes/demandRoute');
const env = require('./environment/env').env;

mongoose.connect(process.env.MongoUrl || env.MongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongo Connection Successful.")
}).catch(err => console.error(err));

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', demandRoute);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});

