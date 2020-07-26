const Discord = require("discord.js")
const main=require('./main.js');
const utility=require('./utils/utility.js');
const logger = require('./utils/logger.js');


const client = new Discord.Client()
client.on("ready", () => {
  logger.info("index.onReady() :: I'm ready, logged in as "+ client.user.tag);
})

//event when a messsage is sent
client.on("message", msg => {
  if (msg.content.startsWith("!godRoll")) { //look for !godRoll commands
    logger.info("index.onMessage :: Oh!, somebody called my name: "+msg.content);
    var args=utility.validateInput(msg.content);
    if (args==-1){
      const responseEmbed = new Discord.MessageEmbed()
      .setColor('#8B0000')
      .setTitle('Eror')
      .setDescription('Error while processing your command (wrong languaje), type he!p for more information about using this bot')
      .setFooter('GodRoll repository (beta)');
      msg.channel.send(responseEmbed);
    }else{
      main.init(args[0],args[1],msg);
    }
  }
  if (msg.content.startsWith("he!p")) {//look fo help command
    logger.info("index.onMessage :: Oh!, somebody called my name: "+msg.content);
    const responseEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setDescription('Use !godRoll weaponName/language \n example !godRoll Beloved/en \n en is for english \n es is for spanish (spain) \n mx is for spanish latinamerica \n '+
    'yeah yeah, should be the same but the weapons names are different, ask bungie')
    .setFooter('GodRoll repository (beta)');
    msg.channel.send(responseEmbed);
  }


})
client.login(process.env.DISCORD_TOKEN)