# useful-http [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> a useful http server


## Install

```sh
$ npm install --save useful-http
```


## Usage

```js
var usefulHttpBuilder = require('useful-http');

httpServer = usefulHttpBuilder(
      {
        staticDirs: ['some-static-dir'],
        serverPagesDir: 'server-pages-dir',
        robots: 'Disallow: /',
        httpLogStream: {write: () => {}}
      }
    )
      .configureSecurity()
      .handleRobots()
      .log()
      .compress()
      .serveFonts()
      .renderIndex()
      .parseBody()
      .serveStatic()
      .handleErrors()
    .build();

// got a useful node http server that is built using express

// start listening on port 8080
httpServer.listen(8080, cb);

// can close
httpServer.close(cb);
```

## License

Apache-2.0 © [Amit Portnoy](https://github.com/amitport)


[npm-image]: https://badge.fury.io/js/useful-http.svg
[npm-url]: https://npmjs.org/package/useful-http
[travis-image]: https://travis-ci.org/amitport/useful-http.svg?branch=master
[travis-url]: https://travis-ci.org/amitport/useful-http
[daviddm-image]: https://david-dm.org/amitport/useful-http.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/amitport/useful-http
