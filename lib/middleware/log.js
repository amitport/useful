import assert from 'assert';
import morgan from 'morgan';

export default function (app, opt) {
  assert(opt, 'log options object is required');

  app.use(morgan('combined', opt));
}
