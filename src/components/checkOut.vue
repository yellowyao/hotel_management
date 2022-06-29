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
        <el-table-column prop="roomNumber" label="房间号" width="100"></el-table-column>
        <el-table-column prop="roomType" label="房间类型" width="100"></el-table-column>
        <el-table-column prop="realName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="identificationNumber" label="身份证" width="180"></el-table-column>
        <el-table-column prop="factCheckInTime" label="入住时间" width="120"></el-table-column>
        <el-table-column prop="days" label="已住天数" width="100"></el-table-column>
        <el-table-column prop="expectedCheckInDays" label="预住天数" width="100"></el-table-column>
        <el-table-column prop="totaldeposit" label="已交押金" width="100"></el-table-column>
        <el-table-column label="即将逾期" width="150">
          <template #default="scope">
            <el-tag v-if="scope.row.expectedCheckInDays-scope.row.days>=2" class="ml-2" type="info">
              否--剩余 {{
                scope.row.expectedCheckInDays - scope.row.days
              }}天
            </el-tag>
            <el-tag v-else-if="scope.row.expectedCheckInDays-scope.row.days<0" class="ml-2" type="danger">已逾期--剩余 {{
                scope.row.expectedCheckInDays - scope.row.days
              }}天
            </el-tag>
            <el-tag v-else class="ml-2" type="warning">即将逾期--剩余 {{
                scope.row.expectedCheckInDays - scope.row.days
              }}天
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="" label="操作">
          <template #default="scope">
            <el-button @click="addCheckInDays(scope.row)" type="primary">延迟离店</el-button>
            <el-button @click="showCheckOut(scope.row)" type="danger">离店</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 40px;" background
                     layout="prev, pager, next"
                     :total="query.total"
                     v-model:currentPage="query.currentPage"
                     :page-size="query.pageSize"
      />
    </el-card>

    <el-dialog
        v-model="dialogVisible_checkOut"
        title="离店"
        width="25%"
        :before-close="handleClose"
    >
      <el-form label-position="left" label-width="100px">
        <el-form-item label="姓名">
          <el-button v-for="item in checkOutInfo.realNames" disabled>{{ item }}</el-button>
        </el-form-item>
        <el-form-item label="房间类型">
          <el-button disabled>{{ checkOutInfo.roomType }}</el-button>
        </el-form-item>
        <el-form-item label="房号">
          <el-button disabled>{{ checkOutInfo.roomNumber }}</el-button>
        </el-form-item>
        <el-form-item label="共住天数">
          <el-button disabled>{{ checkOutInfo.days }}</el-button>
        </el-form-item>
        <el-form-item label="应交">
          <div v-if="isVip">
            <span>感谢您的光临,{{ checkOutInfo.username }}先生
              <el-tag class="ml-2" style="margin-left: 10px"
                      type="success">VIP {{ parseInt(checkOutInfo.vip / 100) }}</el-tag>
            </span>
            <el-button disabled type="danger">
              原价 :
              <text class="title" style="text-decoration: line-through ;">{{ checkOutInfo.price }}</text>
              元
              &nbsp;VIP 特惠价 &nbsp; {{ checkOutInfo.vipprice }} 元!!!
            </el-button>
          </div>

          <el-button v-else disabled type="danger">{{ checkOutInfo.price }} 元</el-button>
        </el-form-item>
        <el-form-item label="退还押金">
          <el-button disabled>{{ checkOutInfo.deposit }}</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="finish()" type="primary">完成</el-button>
      </template>
    </el-dialog>
    <el-dialog
        v-model="dialogVisible_addCheckInDays"
        title="延迟离店"
        width="25%"
        :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="延迟天数">
          <el-input-number v-model="addCheckInDayParam.days" style="width: 250px" placeholder="请输入延迟天数"/>
        </el-form-item>
        <el-form-item label="加收押金">
          <el-button disabled type="danger">{{ addCheckInDayParam.addDeposit }}元</el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitAddCheckInDays">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import orderAPI from "@/api/order";

export default {
  name: "checkOut",
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
        price: 100,
        days: "",
        vipprice: 100,
        vip: 101,
        deposit: 0,
        username: ""

      },
      dialogVisible_addCheckInDays: false,
      row: {},
      addCheckInDayParam: {
        days: "",
        addDeposit: 0
      },
      isVip: false
    }
  },
  created() {
    this.findPage()
  }
  ,

  methods: {
    findPage() {
      orderAPI.findOrderDetailPage(this.query).then(res => {

        this.orderDetails = res.data.list;
        this.query.total = res.data.total;
      });
    }
    ,
    //  计算已住天数
    days(factCheckInTime) {
      let days = (new Date() - new Date(factCheckInTime)) / (1000 * 60 * 60 * 24);
      return days;
    }
    ,
    findAll() {
      this.query.roomNumber = "";
      this.query.realNameOrIdentificationNumber = "";
      this.query.currentPage = 1;
      this.findPage();
    }
    ,
    showCheckOut(row) {
      let params = {
        roomId: row.roomId
      }
      orderAPI.checkOut(params).then(res => {

        this.checkOutInfo.price = res.data.price
        this.checkOutInfo.realNames = res.data.list
        this.checkOutInfo.roomNumber = row.roomNumber;
        this.checkOutInfo.roomType = row.roomType;
        this.checkOutInfo.days = row.days;
        this.checkOutInfo.vipprice = res.data.vipprice;
        this.checkOutInfo.username = res.data.username;
        this.checkOutInfo.vip = res.data.vip;
        this.checkOutInfo.deposit = res.data.deposit;
        if (res.data.vipprice === res.data.price || res.data.username === "000") {
          this.isVip = false
        } else {
          this.isVip = true
        }
      })
      this.dialogVisible_checkOut = true;
    }
    ,
    finish() {
      this.findPage()
      this.dialogVisible_checkOut = false;
    }
    ,
    addCheckInDays(row) {
      this.row = row;
      this.dialogVisible_addCheckInDays = true;
    }
    ,
    submitAddCheckInDays() {
      let param = {
        roomId: this.row.roomId,
        realUserId: this.row.id,
        orderId: this.row.orderId,
        days: this.addCheckInDayParam.days,
      }
      orderAPI.AddCheckInDays(param).then(res => {
        this.dialogVisible_addCheckInDays = false;
        this.row = {};
        this.findPage();
      })
    },
  },
  watch: {
    'addCheckInDayParam.days': function (val) {
      this.addCheckInDayParam.addDeposit = this.addCheckInDayParam.days * this.row.roomDeposit;
    }
  }
}
</script>

<style scoped>

</style>