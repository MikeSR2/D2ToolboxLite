/**
 * some utility functions go here
 */
const PropertiesReader = require('properties-reader');
const prop=PropertiesReader('./properties/app.properties');
const logger = require('./logger.js');

/**
 * Get the db name for the specified languaje
 * @param {String} languaje 
 */
function retrieveDB(languaje){
    var namePrefix=prop.get('db.name.prefix');
    var languajeLowerCase=languaje.toLowerCase();
    return namePrefix+'_'+languajeLowerCase+'.sqlite3'
}


/**
 * Build url
 * @param {String} itemId the item id of which needs to retrieve the info
 */
function buildUrl(itemId){
    var url=prop.get('app.source.url')+itemId;
    logger.info('utility.buildUrl() :: the url is: '+url);
    return url+getContainerName();
}

/**
 * Get container name where the content is 
 */
function getContainerName(){
    var containerName='#'+prop.get('app.source.container');
    logger.debug('utility.getContainerName() :: ContainerName= '+containerName);
    return containerName;
}


/**
 * return the view port width
 */
function getScreenViewPortWidth(){
    return prop.get('app.screen.viewPort.width');

}

/**
 * return the view port height
 */
function getScreenViewPortHeight(){
    return prop.get('app.screen.viewPort.height');

}


/**
 * valide input
 * @param {string} string 
 */
function validateInput(input){
    logger.info('utility.validateInput() :: the user sent: '+input);
    var divd=[];
    var msg = input.substring(9,input.size);
    if (msg.includes('/')){
        divd=msg.split('/');
        if(divd[1].length==0){
            divd[1]='en';
            logger.info('utility.validateInput() :: english selected as default languaje');
        }else{
            if(divd[1]!='en' && divd[1]!='es' && divd[1]!='mx'){
                logger.info('utility.validateInput() :: user typed an invalid languaje');
                return -1;
            }
        }
    }else{
        divd.push(msg);
        divd.push('en');
        logger.info('utility.validateInput() :: english selected as default languaje');
    }

    //check for special characters (usually ' is present in some names)
    if(divd[0].includes("'")){
        logger.debug('utility.validateInput() :: found special character in '+ divd[0]);
        var temp=divd[0].split("'");
        var newName=temp[0]+"''"+temp[1];
        logger.debug('utility.validateInput() :: new name: '+newName);
        divd[0]=newName;
    }

    logger.info('utility.validateInput() :: command args: '+divd);
    return divd;
}

module.exports = {
    retrieveDB,
    buildUrl,
    getContainerName,
    getScreenViewPortHeight,
    getScreenViewPortWidth,
    validateInput

  };