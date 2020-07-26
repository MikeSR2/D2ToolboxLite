const utility=require('./utils/utility.js');
const screenshot=require('./datasource/lightggconsumer.js');
const datasource=require('./datasource/sqldata.js');
const logger = require('./utils/logger.js');
const Discord = require("discord.js")
const constants = require('./utils/constants.js');



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
            .setColor(constants.discordEmbedColorErr)
            .setTitle(constants.discordErrorTitle)
            .setDescription(constants.discordErrorNotFound)
            .setFooter(constants.discordFooter);
            msg.channel.send(responseEmbed);
        }else{
            const url=utility.buildUrl(results);
            screenshot.takeScreenshot(url,viewPortWidth,viewPortHeight,contentContainer,msg,itemName);
        }
       })
       .catch(function(err){
        logger.error('main.init() :: there was an error while performing the DB call: '+err);
        const responseEmbed = new Discord.MessageEmbed()
        .setColor(constants.discordEmbedColorErr)
        .setTitle(constants.discordEmbedColorErr)
        .setDescription(constants.discordErrorDbError)
        .setFooter(constants.discordFooter);
        msg.channel.send(responseEmbed);
       })


}

module.exports = {
    init
  
  };