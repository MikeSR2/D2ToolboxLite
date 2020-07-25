const utility=require('./utils/utility.js');
const screenshot=require('./datasource/lightggconsumer.js');
const datasource=require('./datasource/sqldata.js');
const logger = require('./utils/logger.js');
const Discord = require("discord.js")



/**
 * initialize
 * @param {string} itemName 
 * @param {string} languaje 
 */
function init(itemName,languaje,msg){
    const viewPortWidth=utility.getScreenViewPortWidth();
    const viewPortHeight=utility.getScreenViewPortHeight();
    const contentContainer=utility.getContainerName();
    datasource.executeSQLQuery(languaje,itemName).then(function(results){
        logger.info('main.init() :: response from the DB call: '+results);
        if(results==404){
            logger.error('main.init() :: item not found in the database ');
            const responseEmbed = new Discord.MessageEmbed()
            .setColor('#8B0000')
            .setTitle('Error')
            .setDescription('The item was not found in the database, verify your spelling and try again')
            .setFooter('GodRoll repository (beta)');
            msg.channel.send(responseEmbed);
        }else{
            const url=utility.buildUrl(results);
            screenshot.takeScreenshot(url,viewPortWidth,viewPortHeight,contentContainer,msg);
        }
       })
       .catch(function(err){
        logger.error('main.init() :: there was an error while performing the DB call: '+err);
        const responseEmbed = new Discord.MessageEmbed()
        .setColor('#8B0000')
        .setTitle('Error')
        .setDescription('Error while executing the command, contact the admin if the error persists')
        .setFooter('GodRoll repository (beta)');
        msg.channel.send(responseEmbed);
       })


}

module.exports = {
    init
  
  };