/// <reference path="../definitions/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');
import publishModule = require('./publish');

export function testExport(test: nodeunit.Test) {
  test.ok(publishModule['preprocessor:typescript']);
  test.done();
}