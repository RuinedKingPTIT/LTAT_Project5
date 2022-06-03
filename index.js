import path from "path";

import { fileURLToPath } from "url";
import morgan from "morgan";
import express from 'express'
import { create } from 'express-handlebars'
const app = express()
import dotenv  from 'dotenv'
import bodyParser from 'body-parser';
import weather from 'openweather-apis';

dotenv.config();
const PORT = process.env.PORT || 5000
const hbs = create({ extname: ".hbs" });

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("combined"));
app.get('/', (req, res) => {
  res.render('home', {temp:null});
})

app.post('/weather', (req, res) => {
  weather.setCity('Ha Noi');
  weather.setAPPID('df145a88a3bfa330c6e83a5bbad1ae1d');
  weather.getAllWeather(function(err,temp){
    console.log(temp);
    res.render('home',{temp:temp});
});
})

app.listen(PORT, () => {
  console.log(`Example app listening on port: http://localhost:${PORT}`)
})