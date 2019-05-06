import * as winston from "winston";
var path = require ('path');
winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
require('dotenv').load();
import { DateUtil } from '../util/dateutil';

export class LoggerUtil {

    logger: winston.LoggerInstance;

    constructor(){
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({prettyPrint: true}),
                new (winston.transports.File)({
                    filename: process.env.FILE_LOCATION,
                    prettyPrint: true
                }),
                new (winston.transports.DailyRotateFile)({
                    filename: process.env.FILE_LOCATION,
                    datePattern: process.env.ROLLING_DATE_PATTERN,
                    prepend: true,
                    prettyPrint: true
                })
            ]
        });
    }

    public info(logText: any, msgType?:string): void{
        if(process.env.ENVIRONMENT === 'PROD'){
            this.logger.info(DateUtil.getTimeStamp()+'::::'+logText);
        }
    }

    public debug(logText: any, msgType?:string): void{
        if(process.env.ENVIRONMENT === 'DEV' || process.env.ENVIRONMENT == 'LOCAL' || process.env.ENVIRONMENT === 'STG'){
            this.logger.info(DateUtil.getTimeStamp()+'::::'+logText);
        }
    }

    public error(logText: any, msgType?:string): void {
        console.log("---ERROR---")
        this.logger.error(DateUtil.getTimeStamp()+'::::'+logText);
        console.log("---ERROR---")
    }

    private getDateFormat(): string {
        var date = new Date();
        var returnStr = date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
        return returnStr;
    }
}

// Create the loggerUtil, and export its instance
const loggerUtil = new LoggerUtil();
export default loggerUtil;
