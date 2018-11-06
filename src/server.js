import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/routes'
import db from './config/database';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});