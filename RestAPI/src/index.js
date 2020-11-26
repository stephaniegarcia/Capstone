const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use(require('./routes/user'));
app.use(require('./routes/tce'));
app.use(require('./routes/admin'));
app.use(require('./routes/org'));
app.use(require('./routes/ratings'));
app.use(require('./routes/questions'));
app.use(require('./routes/businessType'));
app.use(require('./routes/businessStep'));


//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});