/**
 * simple logger
 */
const winston = require('winston');
var logLevel="debug";


const myformat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  );
  
  const logger = winston.createLogger({
    level: logLevel, 
      transports: [
          new winston.transports.Console({
              format: myformat
          })
      ]
  });
  
  module.exports=logger;