import assert from 'assert';
import morgan from 'morgan';

export default function (app, config) {
  assert(config.hasOwnProperty('httpLogStream'), 'log config is required');

  app.use(morgan('combined', {
    stream: config.httpLogStream
  }));
}
