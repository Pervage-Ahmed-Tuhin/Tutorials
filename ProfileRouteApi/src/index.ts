import express from 'express';
import 'dotenv/config';
import './db';

import authRouter from './routers/auth';
import audioRouter from './routers/audio';
import favouriteRouter from './routers/favorite';

import playlistRouter from './routers/playlist';
import profileRouter from './routers/profile';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('src/public'));

app.use("/auth", authRouter);
app.use("/audio", audioRouter);
app.use("/favourite", favouriteRouter);
app.use("/playlist", playlistRouter);
app.use("/playlist", playlistRouter);
app.use("/profile", profileRouter);



const PORT = process.env.PORT || 8989;





app.listen(PORT, () => {
    console.log('port is listening on port', PORT);
})