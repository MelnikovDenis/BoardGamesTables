import express from 'express';
import config from 'config';
import cors from 'cors';
import boardRouter from './routers/boardRouter.js';
import memberRouter from './routers/memberRouter.js';
import boardMemberRouter from './routers/boardMemberRouter.js';
import errorHandlingMidleware from './middlewares/errorHandlingMiddleware.js';
import { NotFoundError } from './errors/CustomErrors.js';

const SERVER_PORT = config.get('server.port');
const SERVER_HOST = config.get('server.host');
const CORS_ORIGIN_WHITE_LIST = config.get('cors.origin_white_list');
const app = express();

const corsOptions = {
      origin: CORS_ORIGIN_WHITE_LIST,
      optionSuccessStatus: 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use('/boards', boardRouter);
app.use('/members', memberRouter);
app.use('/boardsMembers', boardMemberRouter);
app.use('*', async (req, res, next) => { 
    next(new NotFoundError('Запрашиваемый ресурс не был найден')); 
});
app.use(errorHandlingMidleware);
await startApp();

async function startApp() {
    try {        
        await app.listen(SERVER_PORT, 
            SERVER_HOST, 
            () => console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`));
    }
    catch(e){
        console.log(e);        
    }
}