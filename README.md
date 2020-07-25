# D2ToolboxLite
Thi is just a small project I build for practicing some JavaScript and this is my first node js.
A simple bot for discord that looks for the god roll of a given weapon name from Destiny 2 
Only 2 commands available for now:
he!p : ask for some help regarding the usage of the bot
!godRoll weapon name/language : looks for the given weapon name in the given language and retrieve the rolls for that weapon.
Available languages:
en -> english
es -> spanish
mx -> spanish latinamerica

why 2 spanish versions? well the name of the weapons changes between spanish from spain and spanish from latinamerica (which was dubbed in mexico)

The flow is like this:
The user sends the command to discord, it will make some validations regarding the given parameters, then it will get the hash from the destiny2.sqlite3 database , which is extracted from the destiny 2 manifiest.
Given this hash or id, it will build the url for consulting an another website (light.gg) where the rolls information comes from. 
I used puppeteer to go to that web site, make an screenshot of the information we need, then send it back to discord.
