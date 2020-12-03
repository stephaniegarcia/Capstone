const express = require('express');
var cors = require('cors')
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router()
const app = express();

app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.set('json spaces', 2);
//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use(require('./routes/user'));
app.use(require('./routes/tce'));
app.use(require('./routes/admin'));
app.use(require('./routes/org'));
app.use(require('./routes/ratings'));
app.use(require('./routes/businessType'));
app.use(require('./routes/businessStep'));
app.use(require('./routes/businessStage'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);