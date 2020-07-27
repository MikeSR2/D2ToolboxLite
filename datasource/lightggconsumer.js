const puppeteer = require('puppeteer');
const logger = require('../utils/logger.js');
const Discord = require("discord.js")
const constants = require('../utils/constants.js');


/**
 * Take the screenshot given an url and send it back to the channel
 * @param {String} url 
 * @param {number} viewPortWidth 
 * @param {number} viewPortHeight 
 * @param {String} contentContainer 
 * @param {object} msg
 * @param {String} itemName
 */
async function takeScreenshot (url,viewPortWidth,viewPortHeight,contentContainer,msg,itemName){
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({
    width: viewPortWidth,
    height: viewPortHeight,
    deviceScaleFactor: 1,
  });

  logger.info('lightggconsumer.takeScreenshot() :: trying to load :: '+url);
  var result=await page.goto(url); //go to the given url
  logger.info('lightggconsumer.takeScreenshot() :: http response code :: '+result.status());
  //Verify the response
  if (result.status()!=200){
    logger.error('lightggconsumer.takeScreenshot() :: Error code: '+result.status());
    const responseEmbed = new Discord.MessageEmbed()
    .setColor(constants.discordEmbedColorErr)
    .setTitle(constants.discordErrorTitle)
    .setDescription(constants.discordErrorSearch)
    .setFooter(constants.discordFooter);
    await msg.channel.send(responseEmbed);
    await browser.close();
    return;
  }


  await page.waitForSelector(contentContainer);          // wait for the selector to load
  logger.info('lightggconsumer.takeScreenshot() :: url loaded');
  //remove ads from page
  await page.evaluate(() => {
    let add1 = document.querySelector('#video');
    let add2 = document.querySelector('.after-perks-ad'); 
  
    add1.parentNode.removeChild(add1);
    add2.parentNode.removeChild(add2);
  }); 

  //take screenshot and save it
  await page.screenshot({path: './tmp/godroll.png'});
  logger.info('lightggconsumer.takeScreenshot() :: screenshot generated');
  //reply to the channel


 
  const responseRoll = new Discord.MessageEmbed()
    .setColor(constants.discordEmbedColorNormal)
    .setTitle(constants.discordResponse+' '+itemName)
    .setFooter(constants.discordFooter)
    .attachFiles(['./tmp/godroll.png'])
	  .setImage('attachment://godroll.png');
  await msg.channel.send(responseRoll);
  logger.info('lightggconsumer.takeScreenshot() :: message sent!');
  await browser.close();
};

module.exports = {
  takeScreenshot

};