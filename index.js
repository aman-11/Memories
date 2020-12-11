const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes =require('./routes/posts')
const dotenv = require('dotenv');
//app config
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//databse connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    }).then( () => app.listen(PORT, () => console.log(`server running on PORT :${PORT}`)))
    .catch((error) => console.log(error.message));

app.use('/posts', postRoutes);
    
app.get('/', (req, res) => {
    res.send('Hello to memories API');
});

mongoose.set('useFindAndModify', false);