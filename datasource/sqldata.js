
const sqlite3 = require('sqlite3').verbose();
const utility=require('../utils/utility.js');
const logger = require('../utils/logger.js');



//executeSQLQuery("en","Tranquility");



/**
 * execute an sql query to the db, looking for the item id
 * @param {String} languaje name and path of the db
 * @param {String} itemName name of the item 
 */
 function executeSQLQuery(languaje,itemName){
  var dbName=utility.retrieveDB(languaje);
  if(dbName==-1){
    return -1;
  }
  logger.info("sqldata.executeQuery() :: using database: "+dbName+' for language: '+languaje);
  logger.info("sqldata.executeQuery() :: looking for item name: "+itemName);
  
  // open the database
  let db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      logger.error("sqldata.executeQuery() :: error on database: "+err.message);
    }
    logger.info("sqldata.executeQuery() :: Connected to the destiny item database");
  
  });


    return new Promise(function(resolve,reject) {
      var query=utility.buildQuery(languaje,itemName);
      logger.debug("sqldata.executeQuery() :: query a ejecutar: "+query);
      db.get(query, function(err, row)  {
      if (err) {
        logger.error("sqldata.executeQuery() :: while executing query: "+err.message);
        reject(new Error(err.message));
      }
      if(row===undefined){
        logger.error("sqldata.executeQuery() :: The item was not found in the database");
        resolve(404);
      }else{
        logger.debug("sqldata.executeQuery() :: query result: "+row.json);
        var jsonObj=JSON.parse(row.json);
        var hash=jsonObj.hash;
        logger.info("sqldata.executeQuery() :: query executed! result: "+hash);
        resolve(hash);

      }
    });
    db.close();
    logger.info("sqldata.executeQuery() :: Connection closed");
  })
    


}





module.exports = {
  executeSQLQuery

};