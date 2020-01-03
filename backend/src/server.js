const app = require('./app');
const requireDir = require('require-dir');

requireDir('./models/Task');

app.listen(3333);