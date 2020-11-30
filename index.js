const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

//settings
app.set('port', process.env.API_PORT || 3030);
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
app.use(require('./routes/questions'));
app.use(require('./routes/businessType'));
app.use(require('./routes/businessStep'));
app.use(require('./routes/businessStage'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});