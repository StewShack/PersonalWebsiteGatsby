'use strict'

const assert = require('assert');

const numericInputTest = require('../src/pages/numericInputTest');

describe( 'Numeric input tests', function() {
    describe( 'A valid value', function() {
        it('should return an ID of 0.', function() {
            var testResults = numericInputTest('7');
            assert.equal( testResults.Id, 0 );
        });
    });
    describe( 'A blank value', function() {
        it('should return an ID of 1.', function() {
            var testResults = numericInputTest('');
            assert.equal( testResults.Id, 1 );
        });
    });
    describe( 'Putting in only spaces', function() {
        it('should return an ID of 2.', function() {
            var testResults = numericInputTest(' ');
            assert.equal( testResults.Id, 2 );
        });
    });
	describe( 'Leading spaces', function() {
        it('should return an ID of 2.', function() {
            var testResults = numericInputTest(' 9');
            assert.equal( testResults.Id, 2 );
        });
    });
	describe( 'Trailing spaces', function() {
        it('should return an ID of 2.', function() {
            var testResults = numericInputTest('5 ');
            assert.equal( testResults.Id, 2 );
        });
    });
    describe( 'Not a number', function() {
        it('should return an ID of 3.', function() {
            var testResults = numericInputTest('ABC');
            assert.equal( testResults.Id, 3 );
        });
    });
    describe( 'A numeric value with leading zeros', function() {
        it('should return an ID of 4.', function() {
            var testResults = numericInputTest('09');
            assert.equal( testResults.Id, 4 );
        });
    });
    describe( 'Lower bound minus one', function() {
        it('should return an ID of 5.', function() {
            var testResults = numericInputTest('0');
            assert.equal( testResults.Id, 5 );
        });
    });
    describe( 'Lower bound', function() {
        it('should return an ID of 6.', function() {
            var testResults = numericInputTest('1');
            assert.equal( testResults.Id, 6 );
        });
    });
    describe( 'Upper bound', function() {
        it('should return an ID of 7.', function() {
            var testResults = numericInputTest('100');
            assert.equal( testResults.Id, 7 );
        });
    });
    describe( 'Upper bound plus one', function() {
        it('should return an ID of 8.', function() {
            var testResults = numericInputTest('101');
            assert.equal( testResults.Id, 8 );
        });
    });
    describe( 'Scientific notation', function() {
        it('should return an ID of 9.', function() {
            var testResults = numericInputTest('5e-1');
            assert.equal( testResults.Id, 9 );
        });
    });
    describe( 'Wrong data type', function() {
        it('should return an ID of 9.', function() {
            var testResults = numericInputTest('10.5');
            assert.equal( testResults.Id, 9 );
        });
    });
    describe( 'Less than 0', function() {
        it('should return an ID of 10.', function() {
            var testResults = numericInputTest('-16516');
            assert.equal( testResults.Id, 10 );
        });
    });
    describe( 'Larger than upper bound plus one', function() {
        it('should return an ID of 11.', function() {
            var testResults = numericInputTest('16516');
            assert.equal( testResults.Id, 11 );
        });
    });

    describe( 'XSS attack', function() {
        it('should return an ID of 12.', function() {
            var testResults = numericInputTest('<script>');
            assert.equal( testResults.Id, 12 );
        });
    });

    describe( 'SQL injection attack', function() {
        it('should return an ID of 13.', function() {
            var testResults = numericInputTest('\' OR 1 = 1 -- ');
            assert.equal( testResults.Id, 13 );
        });
    });
});
