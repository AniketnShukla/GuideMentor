// const { format } = require('date-fns')
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
import { promises as fsPromises } from 'fs';

const logEvents = async (message, logFileName) => {
    // const dateTime = `${(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const now = new Date();
    const dateTime = now.toLocaleString('en-US', {
        year: 'numeric', 
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        
    })
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'backend', 'logs'), {recursive: true})
        }
        await fsPromises.appendFile(path.join(__dirname, 'backend', 'logs', logFileName), logItem)
    }catch(err){
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

export { logEvents, logger };