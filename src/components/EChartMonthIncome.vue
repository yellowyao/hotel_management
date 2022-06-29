<template>
  <div>
    <div style="display:flex; margin-bottom: 20px">
      <el-select clearable v-model="params.hotelId" class="m-2" placeholder="全部酒店">
        <el-option
            v-for="item in hotelList"
            :key="item.value"
            :label="item.hotelname"
            :value="item.id"
        />
      </el-select>
      <el-button type="primary" @click="test_export()" style="margin-left: 20px">导出数据</el-button>

    </div>
    <div id="roomsCheckMonthIncome"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import roomAPI from "@/api/room";
import hotelAPI from "@/api/hotel";
import orderAPI from "@/api/order";

export default {
  name: "EChartMonthIncome",
  data() {
    return {
      params: {
        hotelId: null,
      },
      hotelList: [],

    }
  }
  ,
  mounted() {
    this.getDataAndInit()
    this.findAllHotel()
  }
  ,
  methods: {
    getDataAndInit() {
      orderAPI.getMonthIncome(this.params).then(res => {
        let option = {
          title: {
            text: '酒店月收入情况',
          },
          xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            name: '月份'
          },
          yAxis: {
            type: 'value',
            name: '元'
          },
          series: [
            {
              data: res.data,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              },
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: 'black',
                      fontSize: 14
                    }
                  }
                }
              }
            }
          ]
        };
        let myChart = echarts.init(document.getElementById('roomsCheckMonthIncome'));
        myChart.setOption(option);

      })

    },
    findAllHotel() {
      hotelAPI.findAllHotel().then(res => {
        this.hotelList = res.data
        console.log(this.hotelList)
      })
    },
    test_export() {
      window.location.href = "http://localhost:8866/hotel/orders/export?hotelId=" + this.params.hotelId
    },


  },
  watch: {
    'params.hotelId': function (val) {
      this.getDataAndInit()
    },
    deep: true,

  },

}


</script>

<style>
#roomsCheckMonthIncome {
  width: 1050px;
  height: 500px;
}
</style>