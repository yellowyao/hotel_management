<template>
  <div>
    <el-card>
      <template #header>
        <el-row>
          <el-col :span="10" style="display: flex">
            <el-input v-model="query.roomNumber" placeholder="输入房间号" style="width: 200px"></el-input>
            <el-input v-model="query.realNameOrIdentificationNumber" placeholder="姓名或身份证"
                      style="margin-left: 20px;width: 250px"></el-input>
            <el-button @click="findPage" type="primary" style="margin-left: 20px">查询</el-button>
            <el-button @click="findAll">查询全部</el-button>
          </el-col>
        </el-row>
      </template>
      <el-table :data="orderDetails">
        <el-table-column prop="roomNumber" label="房间号" width="80"></el-table-column>
        <el-table-column prop="roomType" label="房间类型" width="100"></el-table-column>
        <el-table-column prop="realName" label="姓名" width="120"></el-table-column>
        <el-table-column prop="gender" label="性别" width="60"></el-table-column>
        <el-table-column prop="identificationNumber" label="身份证" width="175"></el-table-column>
        <el-table-column prop="factCheckInTime" label="入住时间" width="105"></el-table-column>
        <el-table-column prop="factCheckInTime" label="离店时间" width="105"></el-table-column>
        <el-table-column prop="days" label="已住天数" width="80"></el-table-column>
        <el-table-column prop="totaldeposit" label="已交押金" width="80"></el-table-column>
        <el-table-column prop="expectedCheckInDays" label="预住天数" width="80"></el-table-column>
        <el-table-column prop="orderStatus" label="状态" width="70"></el-table-column>
        <el-table-column prop="phone" label="电话号码"></el-table-column>

      </el-table>
      <el-pagination style="margin-top: 40px;" background
                     layout="prev, pager, next"
                     :total="query.total"
                     v-model:currentPage="query.currentPage"
                     :page-size="query.pageSize"
      />
    </el-card>


  </div>
</template>

<script>
import orderAPI from "@/api/order";

export default {
  name: "expire",
  data() {
    return {
      dialogVisible_checkOut: false,
      orderDetails: [
        {
          roomType: "标准间",
          roomNumber: "101",
          realName: "张三",
          identificationNumber: "123456789123456789",
          phone: "13213211321321",
          totaldeposit: "100",
          factCheckInTime: "2019-01-01",
          days: 0
        }
      ],
      query: {
        roomNumber: "",
        realNameOrIdentificationNumber: "",
        pageSize: 10,
        total: 1000,
        currentPage: 1,
      },
      checkOutInfo: {
        roomNumber: "",
        realNames: [],
        roomType: "",
        price: "",
        days: "",
      }
    }
  },
  created() {
    this.findPage()
  },

  methods: {
    findPage() {
      orderAPI.findHistoryOrderPage(this.query).then(res => {
        console.log(res.data)
        this.orderDetails = res.data.list;
        this.query.total = res.data.total;
      });
    },
    //  计算已住天数
    days(factCheckInTime) {
      let days = (new Date() - new Date(factCheckInTime)) / (1000 * 60 * 60 * 24);
      return days;
    },
    findAll() {
      this.query.roomNumber = "";
      this.query.realNameOrIdentificationNumber = "";
      this.query.currentPage = 1;
      this.findPage();
    },

    finish() {
      this.findPage()
      this.dialogVisible_checkOut = false;
    }

  }
}
</script>

<style scoped>

</style>