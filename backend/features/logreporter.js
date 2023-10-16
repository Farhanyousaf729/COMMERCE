import { format } from 'date-fns';
import fs from "fs/promises";
import path from "path";
import {v4} from "uuid"

export const LogEvents =async (message , LogFileName)=>{
    const date = format(new Date() , 'yyyy-MM-dd\t HH:mm:ss')
    const logItem = `${date} \t ${v4()} \t ${message} \n`


    const newDirPath = './logs';
    const logFileName = path.join(newDirPath, LogFileName);
    try {
        await fs.access(newDirPath)
    }
    catch (accessError) {
        await fs.mkdir(newDirPath)
    }

    await fs.appendFile(logFileName, logItem)
}
export const Logger =(req , res , next)=>{
   LogEvents(`${req.method}\t ${req.url}\t${req.headers.origin}` , `reqLog.log`)
//    console.log(`${req.method}\t ${req.url}`);
   next()
}
