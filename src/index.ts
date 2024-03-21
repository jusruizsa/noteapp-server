import express from 'express';
import usersRouter from '../routes/user-routes';
import noteRoutes from '../routes/note-routes';

const app = express();
const port = 3000;

const logger = require('morgan');

app.use(express.json());
app.use(logger('dev'))


app.use('/users', usersRouter);
app.use('/notes', noteRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});