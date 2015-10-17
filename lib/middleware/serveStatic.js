import assert from 'assert';
import express from 'express';

export default function (app, config) {
  assert(config.hasOwnProperty('staticDirs'), 'static config is required');

  config.staticDirs.forEach(function (staticDir) {
    app.use(express.static(staticDir));
  });
}
