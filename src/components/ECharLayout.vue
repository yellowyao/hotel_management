<template>
  <div style="display: flex;    align-items: center; flex-direction: column ">
    <el-card style="height: 600px; width: 1100px">
      <ECharts/>
    </el-card>
    <el-card style="height: 600px; width: 1100px; margin-top: 20px">
      <EChartMonthIncome/>
    </el-card>
    <el-card style="height: 600px; width: 1100px; margin-top: 20px">
      <EChartCheckInRate/>
    </el-card>
  </div>
</template>

<script>
import ECharts from "@/components/EChartCheckIn.vue";
import EChartMonthIncome from "@/components/EChartMonthIncome.vue";
import EChartCheckInRate from "@/components/EChartCheckInRate";

export default {
  name: "ECharLayout",
  components: {
    ECharts, EChartMonthIncome, EChartCheckInRate
  }
}
</script>

<style scoped>

</style>