'use strict';
let proc = require("process")

// This is an example plugin that prints body content and apply some validation on it

class KongPlugin {
  constructor(config) {
    this.config = config
  }

  async access(kong) {

    let body = await kong.request.getBody("application/json");
    kong.log.inspect(body);
    const validationObj = {};

    try {
      if(body[0].content === undefined || body[0].content.text === undefined || body[0].content.text === ""){
         kong.log.debug('VALIDATION - Text is required!');
         validationObj.field = "content.text";
         validationObj.message = "Text is required.";
         await kong.response.exit(400, validationObj);
       }
       kong.log.info(' Body "content.text" ::: ' + body[0].content.text);

      /* if(body[0].content === undefined || body[0].content.username === undefined || body[0].content.username === ""){
        kong.log.debug('VALIDATION - username is required!');
        validationObj.field = "content.username";
        validationObj.message = "Username is required.";
        await kong.response.exit(400, validationObj);
      }
      kong.log.info(' Body "content.username" ::: ' + body[0].content.username); */

    } catch(err){
        kong.log.debug('Error printing content.text from request body ::: ' + err);
        validationObj.field = "body";
        validationObj.message = "Body mal-formed.";
        await kong.response.exit(400, validationObj);
    }

    kong.log.info('END of access phase!');
  }
}

module.exports = {
  Plugin: KongPlugin,
  Schema: [],
  Version: '0.1.0',
  Priority: 0,
}
