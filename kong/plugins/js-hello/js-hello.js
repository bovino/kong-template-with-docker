'use strict';

let proc = require("process")

// This is an example plugin that add a header to the response

class KongPlugin {
  constructor(config) {
    this.config = config
  }

  async access(kong) {
    let host = await kong.request.getHeader("host")
    if (host === undefined) {
      return await kong.log.err("unable to get header for request")
    }

    let message = this.config.message || "hello"

    // the following can be "parallel"ed
    await Promise.all([
      kong.response.setHeader("x-hello-from-javascript", "Javascript says " + message + " to " + host),
      kong.response.setHeader("x-javascript-pid", proc.pid),
    ])

    kong.log.info(' Path called ::: ' + await kong.request.getPath());
    kong.log.info(' HTTP method called ::: ' + await kong.request.getMethod());
    kong.log.inspect(await kong.request.getBody("application/json"));
    let body = await kong.request.getBody("application/json");

    try {
      kong.log.info(' Body "content.text" ::: ' + body[0].content.text);
    } catch(err){
        kong.log.info('Error printing content.text from request body ::: ' + err);
    }

    kong.log.info('END of access phase!');
  }
}

module.exports = {
  Plugin: KongPlugin,
  Schema: [
    { message: { type: "string" } },
  ],
  Version: '0.1.0',
  Priority: 0,
}
