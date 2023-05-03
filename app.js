const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
	.then(() => console.log('Database connected successfully'))
	.catch((e) => console.log(e));

app.use(bodyParser.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/api', routes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
