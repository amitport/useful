export default function (app, opt) {
  // change some headers for minimal security
  app.disable('x-powered-by'); // avoid telling potential hackers what system is used
  app.use(function (req, res, next) { // prevent this server pages from being displayed in an iframe
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
  });
  app.set('trust proxy', 'loopback'); // NOTE only if we're behind a reverse proxy (as in heroku);

  // TODO CSRF

  if (opt.forceSsl) {
    // Force HTTPS when behind reverse proxy (as when serving from Heroku)
    app.use(function (req, res, next) {
      var protocol = req.get('x-forwarded-proto');
      if (protocol == null || protocol === 'https') {
        next();
      } else {
        res.redirect('https://' + req.hostname + req.url);
      }
    });
  }
}
