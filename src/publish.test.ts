/// <reference path="../definitions/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');

export function testAdd (test: nodeunit.Test) {
	test.equals(2, 3);
	test.done();
}