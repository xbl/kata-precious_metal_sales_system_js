import { formatDate } from './utils';

/**
 * 用于打印的销售凭证
 */
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
   * @param discountCards      付款使用的打折券
   */
  constructor({orderId, createTime,
    memberNo, memberName, oldMemberType, newMemberType, memberPointsIncreased, memberPoints,
    orderItems, totalPrice, discounts, totalDiscountPrice, receivables, payments, discountCards}) {

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
    this.discountCards = discountCards || [];
  }

  getItemsToString() {
    const content = this.items.map((currentValue) => currentValue.toString()).join('\n');
    if (!content) return '';
    return `商品及数量           单价         金额
${content}
合计：${this.totalPrice.toFixed(2)}`;
  }

  getDiscountsToString() {
    const content = this.discounts.map((currentValue) => currentValue.toString()).join('\n');
    if (!content) return '';
    return `
优惠清单：
${content}
优惠合计：${this.totalDiscountPrice.toFixed(2)}
`;
  }

  getPaymentsToString() {
    let result = `应收合计：${this.receivables.toFixed(2)}\n收款：\n`;
    if (this.discountCards && this.discountCards.length) {
      result += this.discountCards.map(_ => ' ' + _ + '\n');
    }

    let content = '';
    if (this.payments && this.payments.length) {
      content = this.payments.map(payment => {
        return ` ${payment.type}：${payment.amount.toFixed(2)}`;
      }).join('\n');
    }
    result += content;
    return result;
  }

  getMemberChangeInfo() {
    if (!this.memberPointsIncreased) return '';
    return `
客户等级与积分：
 新增积分：${this.memberPointsIncreased}
 ${this.oldMemberType !== this.newMemberType ? `恭喜您升级为${this.newMemberType}客户！`: ''}`;
  }

  getReportTitle() {
    return `
方鼎银行贵金属购买凭证

销售单号：${this.orderId} 日期：${formatDate(this.createTime, 'YYYY-MM-dd HH:mm:ss')}
客户卡号：${this.memberNo} 会员姓名：${this.memberName} 客户等级：${this.newMemberType} 累计积分：${this.memberPoints}
`;
  }

  toString() {
    return `
${this.getReportTitle()}
${this.getItemsToString()}
${this.getDiscountsToString()}
${this.getPaymentsToString()}
${this.getMemberChangeInfo()}
`.trim();
  }
}
