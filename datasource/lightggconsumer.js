const puppeteer = require('puppeteer');
const logger = require('../utils/logger.js');
const Discord = require("discord.js")

/**
 * Take the screenshot given an url and send it back to the channel
 * @param {String} url 
 * @param {number} viewPortWidth 
 * @param {number} viewPortHeight 
 * @param {String} contentContainer 
 * @param {object} msg
 */
async function takeScreenshot (url,viewPortWidth,viewPortHeight,contentContainer,msg){
  const browser = await puppeteer.launch();
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
    .setColor('#8B0000')
    .setTitle('Error')
    .setDescription('Error, verify your spelling and try again, report to the admin if the error persists')
    .setFooter('GodRoll repository (beta)');
    await msg.channel.send(responseEmbed);
    await browser.close();
    return;
  }


  await page.waitForSelector(contentContainer);          // wait for the selector to load
  logger.info('lightggconsumer.takeScreenshot() :: url loaded');
  //remove ads from page
  await page.evaluate(() => {
    let example = document.querySelector('#video');
  
    example.parentNode.removeChild(example);
  }); 

  //take screenshot and save it
  await page.screenshot({path: './tmp/godroll.png'});
  logger.info('lightggconsumer.takeScreenshot() :: screenshot generated');
  //reply to the channel
  await msg.channel.send("Info obtained from light.gg",{files: ["./tmp/godroll.png"]});
  logger.info('lightggconsumer.takeScreenshot() :: message sent!');
  await browser.close();
};

module.exports = {
  takeScreenshot

};