# D2ToolboxLite
This is just a small project I build for practicing some JavaScript and this is my first node js project.
A simple bot for discord that looks for the god roll of a given weapon name from Destiny 2. 
Only 2 command are available for now:
he!p : ask for some help regarding the usage of the bot
!godRoll weapon name/language : looks for the given weapon name in the given language and retrieve the rolls for that weapon.
Available languages:
en -> English
es -> Spanish
mx -> Spanish Mexico

Why 2 Spanish versions? Well the name of the weapons change between Spanish from Spain and Spanish from Mexico (which was dubbed in mexico)

The flow is like this:
The user sends the command to discord, it will make some validations regarding the given parameters, then it will get the hash from the destiny2.sqlite3 database , which is extracted from the destiny 2 manifiest. These files should be placed under the db folder
Given this hash or id, it will build the url for consulting on another website (light.gg) where the rolls information comes from. 
I used puppeteer to go to that web site, make a screenshot of the information we need, then send it back to discord.

