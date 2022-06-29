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
    <div id="roomsCheckInChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import roomAPI from "@/api/room";
import hotelAPI from "@/api/hotel";
import axios from "axios";

export default {
  name: "roomsCheckInChart",
  data() {
    return {
      params: {
        startDate: '2022-06-25',
        endDate: '2022-06-30',
        hotelId: null,
        types: ['单人间', '双人间', '三人间', '四人间']
      },
      option: {
        title: {
          text: '酒店客房居住情况',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['单人间', '双人间', '三人间', '四人间']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          name: '日期'
        },
        yAxis: {
          type: 'value',
          name: '居住房间数'
        },
        series: [
          {
            name: '单人间',
            type: 'line',
            data: []

          },
          {
            name: '双人间',
            type: 'line',
            data: []
          },
          {
            name: '三人间',
            type: 'line',
            data: []
          },
          {
            name: '四人间',
            type: 'line',
            data: []
          },
        ]
      },
      hotelList: [],
      chooseDate: [],
      json_data: [
        {
          "日期": "2020-06-25",
          "单人间": "10",
          "双人间": "10",
          "三人间": "10",
          "四人间": "10"
        },
        {
          "日期": "2020-06-26",
          "单人间": "10",
          "双人间": "10",
          "三人间": "10",
          "四人间": "10"
        },
        {
          "日期": "2020-06-27",
          "单人间": "10",
          "双人间": "10",
          "三人间": "10",
          "四人间": "10"
        },
        {
          "日期": "2020-06-28",
          "单人间": "10",
          "双人间": "10",
          "三人间": "10",
          "四人间": "10"
        },
        {
          "日期": "2020-06-29",
          "单人间": "10",
          "双人间": "10",
          "三人间": "10",
          "四人间": "10"
        },
        {
          "日期": "2020-06-30",
          "单人间": "10",
          "双人间": "10",
          "三人间": "10",
          "四人间": "10"
        }
      ],
      title: '酒店客房居住情况',
      json_fields: {}
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
      roomAPI.getRoomcheckinstatus(this.params).then(res => {
        this.option = {
          title: {
            text: '酒店客房情况',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['单人间', '双人间', '三人间', '四人间']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: res.data.单人间date,
            name: '日期'

          },
          yAxis: {
            type: 'value',
            name: '居住房间数'
          },
          series: [
            {
              name: '单人间',
              type: 'line',
              data: res.data.单人间number

            },
            {
              name: '双人间',
              type: 'line',
              data: res.data.双人间number
            },
            {
              name: '三人间',
              type: 'line',
              data: res.data.三人间number
            },
            {
              name: '四人间',
              type: 'line',
              data: res.data.四人间number
            },
          ]
        }
        let myChart = echarts.init(document.getElementById("roomsCheckInChart"))
        myChart.setOption(this.option, true)
      })
    },
    findAllHotel() {
      hotelAPI.findAllHotel().then(res => {
        this.hotelList = res.data
        console.log(this.hotelList)
      })
    },
    log() {
      console.log(this.value1)
    },
    test_export() {
      window.location.href = "http://localhost:8866/hotel/roomcheckinstatus/export?startDate=" + this.params.startDate + "&endDate=" + this.params.endDate + "&hotelId=" + this.params.hotelId
    },
  },
  watch: {
    'params.hotelId': function (val) {
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
#roomsCheckInChart {
  width: 1050px;
  height: 500px;
}
</style>