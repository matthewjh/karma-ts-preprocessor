var add_1 = require('add');
describe('add', function () {
    it('should correctly add 2 and 3', function () {
        expect(add_1.add(2, 3)).toEqual(5);
    });
});
