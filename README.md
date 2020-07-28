# D2ToolboxLite
## About this project
This is just a small project made with node.js and discord.js. I made it just for fun and learning.
## But what does it do?
Well this is a bot for discord that searches for the rolls of a given weapon from Destiny 2.  
Only 2 command are available for now:  
he!p : ask for some help regarding the usage of the bot  
!godRoll weapon name/language : looks for the given weapon name in the given language and retrieve the rolls for that weapon.  
Available languages:  
en -> English  
es -> Spanish  
mx -> Spanish Mexico  

Why 2 Spanish versions? Well the name of the weapons changes between Spanish from Spain and Spanish from Mexico (which was dubbed in mexico)  
The source of the information shown in this bot is gathered from the light.gg website with some web scraping tools but it is not owned or controlled by light.gg or vice versa.  

The flow is like this:  
The user sends the command to discord, it will make some validations regarding the given parameters, then it will get the hash from the destiny2.sqlite3 database, which is extracted from the destiny 2 manifiest. These files should be placed under the db folder.  
Given this hash or id, it will build the url for consulting on another website (light.gg) where the rolls information comes from.  
I used puppeteer to go to that web site, make a screenshot of the information we need, then send it back to discord.

## About the code implementation
I used discord.js for the bot functionality, puppeteer for scraping in the website where the informatio we want comes from, winston for logging, sqlite3 for accesing the sqlite databases and properties-reader for reading some properties for the app.  
There are 3 db files under the db/ folder, this files come from the destiny 2 manifiest, each file corresponds to a languaje.  
For more information about the Destiny 2 manifiest: (http://destinydevs.github.io/BungieNetPlatform/docs/Manifest)
