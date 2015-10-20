import assert from 'assert';
import express from 'express';

export default function (app, opt) {
  assert(opt.hasOwnProperty('dirs'), 'dirs option is required');

  opt.dirs.forEach(function (dir) {
    app.use(express.static(dir));
  });
}
