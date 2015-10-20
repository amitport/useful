import express from 'express';

import requireDir from 'require-dir';
const middleware = requireDir('./middleware');

import * as httpFactory from 'http';

export default function usefulHttpBuilder() {
  const app = express();
  const _middlewareBuilder = {};
  for (var key in middleware) {
    if (middleware.hasOwnProperty(key)) {
      const handler = middleware[key];
      _middlewareBuilder[key] = function (config) {
        handler(app, config);
        return this;
      };
    }
  }

  _middlewareBuilder.build = function () {
    return httpFactory.createServer(app);
  };
  return _middlewareBuilder;
}
