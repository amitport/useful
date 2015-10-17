import assert from 'assert';
import usefulHttpBuilder from '../lib';
import path from 'path';
import request from 'request';

describe('useful-http', function () {
  let usefulHttp;
  before(function (cb) {
    usefulHttp = usefulHttpBuilder(
      {
        staticDirs: [path.join(__dirname, 'fixtures/static')],
        serverPagesDir: path.join(__dirname, 'fixtures/serverPages'),
        robots: 'Disallow: /',
        httpLogStream: {write: () => {}}
      }
    )
      .configureSecurity()
      .handleRobots()
      .log()
      // TODO serve-favicon middleware
      .compress()
      .serveFonts()
      .renderIndex()
      .parseBody()
      // TODO API routes
      .serveStatic()
      .handleErrors()
      .build();

    usefulHttp.listen(8080, cb);
  });
  after(function (cb) {
    usefulHttp && usefulHttp.close(cb);
  });

  it('index page should be rendered', function (cb) {
    request('http://localhost:8080/index.html', function (error, response, body) {
      assert(!error && response.statusCode == 200, 'expected an OK response');
      assert.equal(body.substring(0, 15), 'dynamic content', 'we expected to get a static file with \'content\'');
      cb();
    });
  });
  it('static folders should be served', function (cb) {
    request('http://localhost:8080/file.txt', function (error, response, body) {
      assert(!error && response.statusCode == 200, 'expected an OK response');
      assert.equal(body.substring(0, 7), 'content', 'we expected to get a static file with \'content\'');
      cb();
    });
  });
  it('robots.txt should be served', function (cb) {
    request('http://localhost:8080/robots.txt', function (error, response, body) {
      assert(!error && response.statusCode == 200, 'expected an OK response');
      assert.equal(body, `
User-agent: *
Disallow: /
`, 'we expected to get a static file with \'content\'');
      cb();
    });
  });
});
