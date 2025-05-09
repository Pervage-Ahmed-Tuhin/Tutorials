import express from 'express';
import 'dotenv/config';
import './db';

import authRouter from './routers/auth';
import audioRouter from './routers/audio';
import favouriteRouter from './routers/favorite';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('src/public'));

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/favourite", favouriteRouter);
const PORT = process.env.PORT || 8989;





app.listen(PORT, () => {
    console.log('port is listening on port', PORT);
})