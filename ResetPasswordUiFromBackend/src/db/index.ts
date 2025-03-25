import mongoose from "mongoose";
import { MONGO_URI } from "#/utils/variables";


mongoose.set('strictQuery', true);

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});
