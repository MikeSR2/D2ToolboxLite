/**
 * File that contains list of constants used across the app
 */

const PropertiesReader = require('properties-reader');
const messages=PropertiesReader('./properties/messages.properties');

const discordAuthor=messages.get('discord.author');
const discordFooter=messages.get('discord.footer');
const discordErrorTitle=messages.get('discord.error.title');
const discordHelpTitle=messages.get('discord.help.title');
const discordHelpMessage=messages.get('discord.help.message');
const discordErrorSearch=messages.get('discord.error.desc.search');
const discordErrorLang=messages.get('discord.error.desc.lang');
const discordErrorNotFound=messages.get('discord.error.desc.notfound');
const discordErrorDbError=messages.get('discord.error.desc.dberror');
const discordEmbedColorErr='#'+messages.get('discord.embed.color.error');
const discordEmbedColorNormal='#'+messages.get('discord.embed.color.normal');
const discordResponse=messages.get('discord.response');
const discordErrorNoArgs=messages.get('discord.error.desc.noargs');

module.exports = {
    discordAuthor,
    discordFooter,
    discordErrorTitle,
    discordHelpTitle,
    discordHelpMessage,
    discordErrorSearch,
    discordErrorLang,
    discordErrorNotFound,
    discordErrorDbError,
    discordEmbedColorErr,
    discordEmbedColorNormal,
    discordResponse,
    discordErrorNoArgs
  };