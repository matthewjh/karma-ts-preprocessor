import {Test} from 'nodeunit';
import publishModule = require('./publish');

export = {
  'the karma export should be present': function(test: Test) {
    test.ok(publishModule['preprocessor:typescript']);
    test.done();
  }
};