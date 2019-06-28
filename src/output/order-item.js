export default class OrderItem {

  /**
   * 销售凭证中的订单行
   * @param productNo 产品编号
   * @param productName 产品名称
   * @param price 单价
   * @param amount 数量
   * @param subTotal 小计
   */
  constructor({productNo, productName, price, amount, subTotal}) {
    this.productNo = productNo;
    this.productName = productName;
    this.price = price || 0;
    this.amount = amount || 0;
    this.subTotal = subTotal || 0;
  }

  toString() {
    return `(${this.productNo})${this.productName}x${this.amount}, ${this.price.toFixed(2)}, ${this.subTotal.toFixed(2)}`;
  }
}
