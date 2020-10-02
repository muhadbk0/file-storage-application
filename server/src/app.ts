import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
// import { createServer } from 'https';

import Logger from './loaders/logger';
// import key from './config/server.key';
// import crt from './config/server.crt';

async function startServer() {
  const app = express();

  // const credentials = {key: key, cert: crt};
  // const httpsServer = createServer(credentials,app);

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  // httpsServer.listen(443);

  app.listen(parseInt(config.port),() => {
    try{
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
    }
    catch(e){
      Logger.error(e);
      process.exit(1);
      // return;
    }
  });

}

startServer();