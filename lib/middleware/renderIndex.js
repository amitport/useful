import ejs from 'ejs';
import assert from 'assert';

export default function (app, config) {
  assert(config.hasOwnProperty('serverPagesDir'), 'render config is required');

  app.engine('html.ejs', ejs.renderFile);
  app.set('view engine', 'html.ejs');
  app.set('views', config.serverPagesDir);
  app.get(/^\/(index\.html)?$/, function (req, res) {
    res.render('index', {env: process.env.NODE_ENV});
  });

}
