import ejs from 'ejs';
import assert from 'assert';

export default function (app, opt) {
  assert(opt.hasOwnProperty('serverPagesDir'), 'serverPagesDir option is required');

  app.engine('html.ejs', ejs.renderFile);
  app.set('view engine', 'html.ejs');
  app.set('views', opt.serverPagesDir);
  app.get([/^\/(?:index\.html)?$/i,
    new RegExp(`^/(${opt.clientRoutes.join('|')})(?:/|(?:/[^/]+))*$`, 'i')], function (req, res) {
    res.render('index', {env: process.env.NODE_ENV});
  });
}
