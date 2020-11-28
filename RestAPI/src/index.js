const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


//settings
app.set('port', process.env.PORT || 3000);
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
<<<<<<< HEAD
app.use(require('./routes/businessStage'));
=======
app.use(cors());
>>>>>>> b7f661840c3c0a9a37bddacab3515197f4e428b1


//starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});