const app = require('./app');

const mongoose = require('mongoose');
const requireDir = require('require-dir');

requireDir('./models/Task');

app.listen(3333);