import {Pagination} from '../../src/Classes/Pagination';
var assert = require('assert');
var expect = require('expect.js');

const per_page = 10;
const total = 3606;
const total_pages = 361;

describe('test', function() {
    it('should return true', function() {
        assert.equal(1 === 1, true);
    });
});

describe('Pagination', function () {
    describe('Test setNumberOfPages', function() {

        let pageLength = 20;
        let pages = Pagination.setNumberOfPages(pageLength);

        it('should be an array', function() {
            expect(pages).to.be.an('array');
        });

        it('should return 20', function() {
            assert.equal(pages.length, pageLength);
        });

        it('should be filled with null', function() {
            let pages = Pagination.setNumberOfPages(3);
            assert.deepEqual([null, null, null], pages)
        });

    });

    describe('Test getBetweenList', function() {
        const current = 40;
        const range = 7;
        const rageResult = [33,34,35,36,37,38,39,40,41,42,43,44,45,46,47];

        let between = Pagination.getBetween(current, range);

        it('should be an array', () => {
            expect(between).to.be.an('array');
        });

        it('should return an array with lenght 15', () => {
            assert.equal(between.length, 15);
        });

        it('should return an array between 33 and 47', () => {
            assert.deepEqual(rageResult, between);
        });
    });

    describe('Test makeList', () => {
        let list = Pagination.makeList(1, 7)
        
        it('should be an array', () => {
            expect(list).to.be.an('array');
        });

        it('should return an array with [1,2,3,4,5,6,7]', () => {
            assert.deepEqual(list, [1,2,3,4,5,6,7]);
        });

    });

    describe('Test getThresholds', () => {
        let total = 100;
        let th = 3;
        let current = 1;
        let p = Pagination._getThresholds(current, total, th);

        it('should return an object', () => {
            expect(p).to.be.an('object');
        });

        it('should return thresholdLeft 1', () => {
            assert.equal(p.left, 1);
        });

        it('should return thresholdLeft 1', () => {
            let p = Pagination._getThresholds(2, total, th);
            assert.equal(p.left, 1);
        });

        it('should return thresholdLeft 1', () => {
            let p = Pagination._getThresholds(3, total, th);
            assert.equal(p.left, 1);
        });

        it('should return thresholdLeft 10', () => {
            let p = Pagination._getThresholds(13, total, th);
            assert.equal(p.left, 10);
        });

        it('should return thresholdLeft 15', () => {
            let p = Pagination._getThresholds(15, total, th);
            assert.equal(p.left, 12);
        });

        it('should return thresholdRight 100', () => {
            let p = Pagination._getThresholds(98, total, th);
            assert.equal(p.right, 100);
        });

        it('should return thresholdRight 100', () => {
            let p = Pagination._getThresholds(100, total, th);
            assert.equal(p.right, 100);
        });

        it('should return thresholdRight 20', () => {
            let p = Pagination._getThresholds(17, total, th);
            assert.equal(p.right, 20);
        });

        it('should return thresholdRight 10 and thresholdLeft 16', () => {
            let p = Pagination._getThresholds(13, total, th);
            assert.equal(p.right, 16);
            assert.equal(p.left, 10);
        });

        it('shoul return 7 itens', () => {
            let current10 = Pagination._getThresholds(2, 200, 3);
            assert.equal(current10.right, 7);
        });

        it('shoul return 7 itens', () => {
            let p = Pagination._getThresholds(3, 200, 3);
            assert.equal(p.right, 7);
        });

        it('shoul return 7 itens', () => {
            let p = Pagination._getThresholds(198, 200, 3);
            assert.equal(p.left, 194);
        });
        
    });

    describe('Test _renderBetwin', () => {
        let pagination = Pagination.makeList(1, 101);
        let current = 20;
        let th = 3;
        let total = 101;
        let list = Pagination._renderBetween(pagination, current, th, total);

        it('should be an array', () => {
            expect(list).to.be.an('array');
        });

        it('should return a between array', () => {
            assert.deepEqual(list, [1,'...',17,18,19,20,21,22,23,'...',101])
        });

        it('should return a between array', () => {
            current = 18;
            let p = Pagination._renderBetween(pagination, current, th, total);
            assert.deepEqual(p, [1,'...',15,16,17,18,19,20,21,'...',101])
        });

        it('should return a between array', () => {
            current = 19;
            th = 3;
            let p = Pagination._renderBetween(pagination, current, th, total);
            assert.deepEqual(p, [1,'...',16,17,18,19,20,21,22,'...',101])
        });

        it('should return a between array', () => {
            current = 2;
            th = 3;
            let p = Pagination._renderBetween(pagination, current, th, total);
            assert.equal(p, null);
        });

    });

    describe('Test renderStart', () => {
        let pagination = Pagination.makeList(1, 101);
        let list = Pagination._renderStart(1, 3, 101, pagination, 10);

        it('should be an array', () => {
            expect(list).to.be.an('array');
        });

        it('should return an start pagination array', () => {
            let expected = [1,2,3,4,5,6,7,8,'...',101];
            assert.deepEqual(list, expected);
        });

        it('should return an start pagination current = 2', () => {
            let current2 = Pagination._renderStart(2, 3, 101, pagination, 10);
            let expected = [1,2,3,4,5,6,7,8,'...',101];
            assert.deepEqual(current2, expected);
        });

        it('should return an start pagination current = 4', () => {
            let current4 = Pagination._renderStart(4, 3, 101, pagination, 10);
            let expected = [1,2,3,4,5,6,7,8,'...',101];
            assert.deepEqual(current4, expected);
        });

        it('should return an start pagination current = 8', () => {
            let current8 = Pagination._renderStart(8, 3, 101, pagination, 10);
            let expected = null;
            assert.deepEqual(current8, expected);
        });
    });

    describe('Test renderEnd', () => {
        let pagination = Pagination.makeList(1, 101);
        let list = Pagination._renderEnd(96, 100, 3, 10, pagination);
        it('should be an array', () => {
            expect(list).to.be.an('array');
        });

        it('should render a end pagination', () => {
            let expected = [1,'...',94,95,96,97,98,99,100,101];
            assert.deepEqual(list, expected);
        });

        it('should render a end pagination current = 100', () => {
            let current100 = Pagination._renderEnd(100, 101, 3, 10, pagination);
            let expected = [1,'...',94,95,96,97,98,99,100,101];
            assert.deepEqual(current100, expected);
        });

        it('should render a end pagination current = 94', () => {
            let current94 = Pagination._renderEnd(94, 101, 3, 10, pagination);
            let expected = null;
            assert.deepEqual(current94, expected);
        });

    });

    describe('Test getPageList', () => {
        let pagination = Pagination.getPageList(1, 3, 15, 200);
        it('should return an array', () => {
            expect(pagination).to.be.an('array');
        });

        it('should return a pagination current = 1', () => {
            let expected = [1,2,3,4,5,6,7,8,9,10,11,12,13,'...',200];
            assert.deepEqual(pagination, expected);
        });
        
        it('should return a pagination current = 2', () => {
            let p = Pagination.getPageList(2, 3, 15, 200);
            let expected = [1,2,3,4,5,6,7,8,9,10,11,12,13,'...',200];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 6', () => {
            let p = Pagination.getPageList(2, 3, 15, 200);
            let expected = [1,2,3,4,5,6,7,8,9,10,11,12,13,'...',200];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 7', () => {
            let p = Pagination.getPageList(7, 3, 15, 200);
            let expected = [1,'...',4,5,6,7,8,9,10,'...',200];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 100', () => {
            let p = Pagination.getPageList(100, 3, 15, 200);
            let expected = [1,'...',97,98,99,100,101,102,103,'...',200];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 194', () => {
            let p = Pagination.getPageList(194, 3, 15, 200);
            let expected = [ 1, '...', 191, 192, 193, 194, 195, 196, 197, '...', 200 ];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 195', () => {
            let p = Pagination.getPageList(195, 3, 15, 200);
            let expected = [ 1, '...', 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200 ];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 199', () => {
            let p = Pagination.getPageList(199, 3, 15, 200);
            let expected = [ 1, '...', 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200 ];
            assert.deepEqual(p, expected);
        });

        it('should return a pagination current = 200', () => {
            let p = Pagination.getPageList(200, 3, 15, 200);
            let expected = [ 1, '...', 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200 ];
            assert.deepEqual(p, expected);
        });

    });

});
