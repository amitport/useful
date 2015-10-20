import assert from 'assert';

export default function (app, opt){
  assert(opt.hasOwnProperty('disallow'), 'disallow option is required');

  const robotsTxt = `
User-agent: *
Disallow: ${opt.disallow}
`;
  app.get('/robots.txt', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}
