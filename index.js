import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
//app config
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//databse connection  process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;
const url = 'mongodb+srv://admin:987321@cluster0.kidpw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`server running on PORT :${PORT}`)))
    .catch((error) => console.log(error.message));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to memories API');
});

mongoose.set('useFindAndModify', false);