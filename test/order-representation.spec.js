import assert from 'assert';
import { readFile } from 'fs';
import { promisify } from 'util';
import OrderRepresentation from '../src/representation/order-representation';

describe('OrderRepresentation', () => {
  it('如果构造 OrderRepresentation 对象，当调用 toString() 方法，则得到期望的结果字符串', async () => {
    const data = {
      createTime: new Date(),
      orderId: '0000001',
      memberNo: '6236609999',
      memberName: '马丁',
      memberPoIncreased: 2,
      memberPoints: 18268,
      newMemberType: '金卡',
      totalPrice: 12036.00,
      totalDiscountPrice: 20.0,
      receivables: 9468.00,
      oldMemberType: '普卡',
      memberPointsIncreased: 9408,
    };
    const orderRepresentation = new OrderRepresentation(data);
    const expectedResult = await promisify(readFile)(`${__dirname}/resources/sample_result.txt`, 'utf8');
    assert.equal(orderRepresentation.toString(), expectedResult.trim());
  });
});
