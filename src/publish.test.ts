/// <reference path="../definitions/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');
import publishModule = require('./publish');

export = {
  'the karma export should be present': function(test: nodeunit.Test) {
    test.ok(publishModule['preprocessor:typescript']);
    test.done();
  }
};