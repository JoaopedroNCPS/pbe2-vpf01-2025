require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const router = require('./src/router');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT,()=>{
    console.log('API respondendo em http://localhost:'+process.env.PORT);
});