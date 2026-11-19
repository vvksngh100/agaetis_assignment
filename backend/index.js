import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import router from './src/routes/route.js';
import { query } from './src/db/db.js';

configDotenv();

const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is started at port ${port}`);
    async function connect() {
        const queryRes = await query('SELECT NOW()');
        console.log(queryRes.rows[0].now);
    }  
    connect();
})
