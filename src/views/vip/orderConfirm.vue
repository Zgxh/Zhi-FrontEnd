<template>
  <div style="margin-top: 200px">
    <div>订单名称：{{ orderInfo.productName }}</div>
    <div>商品描述：{{ orderInfo.description }}</div>
    <div>商品价格：{{ orderInfo.price }}</div>
    <div>
      <button @click="confirmOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderConfirm",
  data() {
    return {
      orderInfo: {},
      vipOrderToken: "",
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
          // 拿到订单号，跳转支付页面
        } else {
          // 回到获取订单信息的页面，重新获取vip订单信息
        }
      });
    },
  },
};
</script>

<style>
</style>