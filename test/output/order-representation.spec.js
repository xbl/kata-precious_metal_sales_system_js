import path from 'path';
import assert from 'assert';
import { readFile } from '../../src/output/utils';
import OrderItem from '../../src/output/order-item';
import DiscountItem from '../../src/output/discount-item';
import OrderRepresentation from '../../src/output/order-representation';


describe('OrderRepresentation', () => {
  it('如果构造 OrderRepresentation 对象，当调用 toString() 方法，则得到期望的结果字符串', async () => {
    const items = [
      new OrderItem({productNo: '001001', productName: '世园会五十国钱币册', price: 998.00, amount: 2, subTotal: 1996.00 }),
      new OrderItem({productNo: '001002', productName: '2019北京世园会纪念银章大全40g', price: 1380.00, amount: 3, subTotal: 4140.00 }),
      new OrderItem({productNo: '002002', productName: '中国经典钱币套装', price: 998.00, amount: 1, subTotal: 998.00 }),
      new OrderItem({productNo: '002003', productName: '中国银象棋12g', price: 698.00, amount: 5, subTotal: 3490.00 }),
    ];

    const discounts = [
      new DiscountItem({productNo: '001002', productName: '2019北京世园会纪念银章大全40g', discount: -414.00 }),
      new DiscountItem({productNo: '002003', productName: '中国银象棋12g', discount: -350.00 }),
    ];

    const payments = [
      {
        type: '余额支付',
        amount: 9860.00
      }
    ];
    const data = {
      createTime: new Date('2019-07-02 15:00:00'),
      orderId: '0000001',
      memberNo: '6236609999',
      memberName: '马丁',
      memberPoIncreased: 2,
      memberPoints: 19720,
      newMemberType: '金卡',
      totalPrice: 10624.00,
      totalDiscountPrice: 764.00,
      receivables: 9860.00,
      oldMemberType: '普卡',
      memberPointsIncreased: 9860,
      orderItems: items,
      discounts,
      payments,
      discountCards: ['9折券']
    };
    const orderRepresentation = new OrderRepresentation(data);
    const expectedResult = await readFile(path.join(__dirname, '../resources/sample_result.txt'), 'utf8');
    assert.equal(orderRepresentation.toString(), expectedResult.trim());
  });
});
