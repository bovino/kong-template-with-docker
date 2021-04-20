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

    try {
      if(body[0].content === undefined || body[0].content.text === undefined || body[0].content.text === ""){
        kong.log.debug('VALIDATION - Text is required!');
        await kong.response.exit(400, "Text is required.");
      }
      kong.log.info(' Body "content.text" ::: ' + body[0].content.text);

    } catch(err){
        kong.log.debug('Error printing content.text from request body ::: ' + err);
        await kong.response.exit(400, "Body mal-formed.");
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
