# useful-http [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> a useful http server


## Install

```sh
$ npm install --save useful-http
```


## Usage

```js
var usefulHttp = require('useful-http');

usefulHttp = usefulHttpBuilder(
      {
        staticDirs: [path.join(__dirname, 'static')],
        serverPagesDir: path.join(__dirname, 'serverPages'),
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

// usefulHttp is a node http server that is built using express

// start listening on port 8080
usefulHttp.listen(8080, cb);

// can close
usefulHttp.close(cb);
```

## License

Apache-2.0 © [Amit Portnoy](https://github.com/amitport)


[npm-image]: https://badge.fury.io/js/useful-http.svg
[npm-url]: https://npmjs.org/package/useful-http
[travis-image]: https://travis-ci.org/amitport/useful-http.svg?branch=master
[travis-url]: https://travis-ci.org/amitport/useful-http
[daviddm-image]: https://david-dm.org/amitport/useful-http.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/amitport/useful-http
