/// <reference path="../definitions/jasmine.d.ts"/>

import {add} from 'add';

describe('add', () => {
	it('should correctly add 2 and 3', () => {
		expect(add(2, 3)).toEqual(5);
	});
});