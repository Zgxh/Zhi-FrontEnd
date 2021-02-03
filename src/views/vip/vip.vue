<template>
  <div style="margin-top: 200px">
    <button @click="toVipOrder">购买VIP</button>
  </div>
</template>

<script>
export default {
  name: "Vip",
  methods: {
    toVipOrder() {
      this.$router.push({ name: "VipOrder" });
    },
  },
};
</script>

<style>
</style>