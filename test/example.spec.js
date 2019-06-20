import assert from 'assert';
import OrderApp from '../src/order-app';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
      assert.equal(OrderApp.checkout('abc'), null);
    });
  });
});
