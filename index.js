const Discord = require("discord.js")
const main=require('./main.js');
const utility=require('./utils/utility.js');
const logger = require('./utils/logger.js');
const constants = require('./utils/constants.js');


const client = new Discord.Client()
client.on("ready", () => {
  logger.info("index.onReady() :: I'm ready, logged in as "+ client.user.tag);
})

//event when a messsage is sent
client.on("message", msg => {
  var command=msg.content.toLowerCase();
  if (command.startsWith("!godroll")) { //look for !godRoll commands
    logger.info("index.onMessage :: Oh!, somebody from "+ msg.guild.id+ " called my name: "+msg.content);
    var args=utility.validateInput(msg.content);
    if (args==-1){
      const responseEmbed = new Discord.MessageEmbed()
      .setColor(constants.discordEmbedColorErr)
      .setTitle(constants.discordErrorTitle)
      .setDescription(constants.discordErrorLang)
      .setFooter(constants.discordFooter);
      msg.channel.send(responseEmbed);
    } else if (args==-2){
      const responseEmbed = new Discord.MessageEmbed()
      .setColor(constants.discordEmbedColorErr)
      .setTitle(constants.discordErrorTitle)
      .setDescription(constants.discordErrorNoArgs)
      .setFooter(constants.discordFooter);
      msg.channel.send(responseEmbed);
    }else{
      main.init(args[0],args[1],msg);
    }
  }
  if (command.startsWith("he!p")) {//look fo help command
    logger.info("index.onMessage :: Oh!, somebody called my name: "+msg.content);
    const responseEmbed = new Discord.MessageEmbed()
    .setColor(constants.discordEmbedColorNormal)
    .setTitle(constants.discordHelpTitle)
    .setDescription(constants.discordHelpMessage)
    .setFooter(constants.discordFooter);
    msg.channel.send(responseEmbed);
  }


})
client.login("NzM2Mzk2Njc1MzQ5ODcyNzMx.XxuM2A.LLdX_UD7us8ejoHglKkaXoJLwqw");