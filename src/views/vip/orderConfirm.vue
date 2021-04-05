<template>
  <div style="margin-top: 200px">
    <div>订单名称：{{ orderInfo.productName }}</div>
    <div>商品描述：{{ orderInfo.description }}</div>
    <div>商品价格：{{ orderInfo.price }}</div>
    <div>
      <button @click="confirmOrder">提交订单</button>
    </div>
    <span v-html="html"></span>
  </div>
</template>

<script>
export default {
  name: "OrderConfirm",
  data() {
    return {
      orderInfo: {},
      vipOrderToken: "",
      html: "",
    };
  },
  created() {
    this.getVipOrderInfo();
  },
  methods: {
    // 获取vip订单信息
    getVipOrderInfo() {
      this.$http({
        url: this.$http.adornUrl("http://order.zhizhi.com/order/vip/get"),
        method: "get",
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.orderInfo = data.vipOrderInfo;
          this.vipOrderToken = data.vipOrderToken;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    // 确认并创建订单
    confirmOrder() {
      this.$http({
        url: this.$http.adornUrl("http://order.zhizhi.com/order/vip/submit"),
        method: "post",
        data: this.$http.adornData(
          {
            id: this.orderInfo.id,
            productName: this.orderInfo.productName,
            price: this.orderInfo.price,
            vipOrderToken: this.vipOrderToken,
          },
          false,
          "json"
        ),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          // 订单创建成功，去支付页面
          let gotVipOrderInfo = data.orderInfo;
          this.postPayment(gotVipOrderInfo);
        } else {
          // 订单提交失败，清除数据，刷新页面，重新获取vip订单信息
          this.orderInfo = {};
          this.vipOrderToken = "";
          this.$router.go(0);
        }
      });
    },
    // 去支付
    postPayment(orderInfo) {
      this.$http({
        url: this.$http.adornUrl("http://order.zhizhi.com/order/pay/confirm"),
        method: "post",
        data: this.$http.adornData(
          {
            orderNumber: orderInfo.orderNumber,
            totalAmount: orderInfo.totalAmount,
            payment: "支付宝",
          },
          false,
          "json"
        ),
      }).then((data) => {
        console.log(data.data);
        const div = document.createElement("div");
        /* 此处form就是后台返回接收到的数据 */
        div.innerHTML = data.data;
        document.body.appendChild(div);
        document.forms[0].submit();
      });
    },
  },
};
</script>

<style>
</style>