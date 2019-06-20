export default class OrderRepresentation {
  /**
   * @param orderId            订单号
   * @param createTime         订单创建时间
   * @param memberNo           会员编号
   * @param memberName         会员姓名
   * @param oldMemberType      原会员等级
   * @param newMemberType      新会员等级。当新老等级不一致时，视为升级
   * @param memberPointsIncreased    本次消费会员新增的积分
   * @param memberPoints       会员最新的积分( = 老积分 + memberPointsIncreased)
   * @param orderItems         订单明细
   * @param totalPrice         订单总金额
   * @param discounts          优惠明细
   * @param totalDiscountPrice 优惠总金额
   * @param receivables        应收金额
   * @param payments           付款记录
   */
  constructor({orderId, createTime,
    memberNo, memberName, oldMemberType, newMemberType, memberPointsIncreased, memberPoints,
    orderItems, totalPrice, discounts, totalDiscountPrice, receivables, payments}) {

    this.orderId = orderId;
    this.createTime = createTime;
    this.memberNo = memberNo;
    this.memberName = memberName;
    this.oldMemberType = oldMemberType;
    this.newMemberType = newMemberType;
    this.memberPointsIncreased = memberPointsIncreased;
    this.memberPoints = memberPoints;
    this.items = orderItems || [];
    this.totalPrice = totalPrice || 0;
    this.discounts = discounts || [];
    this.totalDiscountPrice = totalDiscountPrice || 0;
    this.receivables = receivables || 0;
    this.payments = payments || [];
  }

  toString() {
    return `
方鼎银行贵金属购买凭证

销售单号：${this.orderId} 日期：2019-11-11 23:00:00
客户卡号：${this.memberNo} 会员姓名：${this.memberName} 客户等级：${this.newMemberType}  累计积分：${this.memberPoints}

商品及数量           单价         金额
(001001)世园会五十国钱币册x 2,998.00,1996.00
(001002)2019北京世园会纪念银章大全40g x 3, 1380.00,4140.00
(002002)中国经典钱币套装x 1, 1500.00,1500.00
(002003)中国银象棋32gx 2, 2200.00,4400.00
合计：${this.totalPrice.toFixed(2)}

优惠清单：
(001002)2019北京世园会纪念银章大全:-138.00
(002002)中国经典钱币套装:-10.00
(002003)中国银象棋:-2420.00
优惠合计：2568.00

应收合计：${this.receivables.toFixed(2)}
收款：
 9折打折券 x 1
 账户余额：9408.00元
客户等级与积分：
 新增积分：${this.memberPointsIncreased}
 恭喜您升级为金卡客户！
`.trim();
  }
}
