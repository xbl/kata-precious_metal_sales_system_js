export default class DiscountItem {
  /**
   * 销售凭证中的优惠项
   * @param productNo 产品编号
   * @param productName 产品名称
   * @param discount 优惠金额
   */
  constructor({productNo, productName, discount}) {
    this.productNo = productNo;
    this.productName = productName;
    this.discount = discount || 0;
  }

  toString() {
    return `(${this.productNo})${this.productName}: ${this.discount.toFixed(2)}`;
  }
}
