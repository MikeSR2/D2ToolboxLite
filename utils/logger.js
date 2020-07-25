/**
 * simple logger
 */
const winston = require('winston');
const PropertiesReader = require('properties-reader');
const prop=PropertiesReader('./properties/env.properties');
var logLevel=prop.get('app.logger.level');


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