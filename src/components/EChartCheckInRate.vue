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
      <el-date-picker
          v-model="chooseDate"
          type="daterange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="margin-left: 250px"
          value-format="YYYY-MM-DD"
      />

      <el-button type="primary" @click="test_export" style="margin-left: 20px">导出数据</el-button>

    </div>
    <div id="EChartCheckInRate"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import roomAPI from "@/api/room";
import hotelAPI from "@/api/hotel";

export default {
  name: "EChartCheckInRate",
  data() {
    return {
      params: {
        startDate: '2022-06-20',
        endDate: '2022-06-30',
        hotelId: null,
      },
      hotelList: [],
      chooseDate: [],
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

      hotelAPI.CalculateCheckInRate(this.params).then(res => {
        let data = [];
        res.data.forEach(item => {
          data.push([{
            name: '入住率',
            value: item
          }, {
            name: '空房率',
            value: 1 - item
          }])
        })

        let option = {
              title: [
                {
                  text: '各类型房间入住率',
                  left: 'center'
                },
                {
                  subtext: '单人间',
                  left: '12.5%',
                  top: '75%',
                  textAlign: 'center'
                },
                {
                  subtext: '双人间',
                  left: '37.5%',
                  top: '75%',
                  textAlign: 'center'
                },
                {
                  subtext: '三人间',
                  left: '62.5%',
                  top: '75%',
                  textAlign: 'center'
                },
                {
                  subtext: '四人间',
                  left: '87.5%',
                  top: '75%',
                  textAlign: 'center'
                }
              ],
              tooltip: {
                trigger: 'item'
              },
              series: [
                {
                  type: 'pie',
                  radius: '25%',
                  center: ['50%', '50%'],
                  data: data[0],
                  label: {
                    position: 'outer',
                    alignTo: 'none',
                    bleedMargin: 5
                  },
                  left: 0,
                  right: '75%',
                  top: 0,
                  bottom: 0,

                },
                {
                  type: 'pie',
                  radius: '25%',
                  center: ['50%', '50%'],
                  data: data[1],
                  label: {
                    position: 'outer',
                    alignTo: 'labelLine',
                    bleedMargin: 5
                  },
                  left: '25%',
                  right: '50%',
                  top: 0,
                  bottom: 0
                },
                {
                  type: 'pie',
                  radius: '25%',
                  center: ['50%', '50%'],
                  data: data[2],
                  label: {
                    position: 'outer',
                    alignTo: 'edge',
                    margin: 20
                  },
                  left: '50%',
                  right: '25%',
                  top: 0,
                  bottom: 0
                },
                {
                  type: 'pie',
                  radius: '25%',
                  center: ['50%', '50%'],
                  data: data[3],
                  label: {
                    position: 'outer',
                    alignTo: 'edge',
                    margin: 20
                  },
                  left: '75%',
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              ]
            }
        ;
        let myChart = echarts.init(document.getElementById("EChartCheckInRate"))
        myChart.setOption(option, true)
      })


    },
    findAllHotel() {
      hotelAPI.findAllHotel().then(res => {
        this.hotelList = res.data
        console.log(this.hotelList)
      })
    },
    log() {
    },
    test_export() {
      window.location.href = "http://localhost:8866/hotel/hotels/export?startDate=" + this.params.startDate + "&endDate=" + this.params.endDate + "&hotelId=" + this.params.hotelId
    },


  },
  watch: {
    'params.hotelId': function (val) {
      console.log(this.params.hotelId)
      this.getDataAndInit()
    },
    deep: true,
    chooseDate: function (val) {
      this.params.startDate = val[0]
      this.params.endDate = val[1]
      this.getDataAndInit()
    }
  }
}


</script>

<style>
#EChartCheckInRate {
  width: 1050px;
  height: 500px;
}
</style>