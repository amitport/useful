import assert from 'assert';

export default function (app, config){
  assert(config.hasOwnProperty('robots'), 'robots config is required');

  const robotsTxt = `
User-agent: *
${config.robots}
`;
  app.get('/robots.txt', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}
