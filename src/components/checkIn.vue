<template>
  <div id="checkIn">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-row align="middle">
            <el-col :span="4" style="display: flex">
              <el-input v-model="query.nameOrEmail" placeholder="用户名或用户邮箱" style="margin-left: 10px"></el-input>

            </el-col>
            <el-col :span="3" style="display: flex">
              <el-button @click="findPage()" style="margin-left: 10px" type="primary">搜索</el-button>

              <el-button @click="findAll()" style="margin-left: 10px" type="primary">查询全部</el-button>
            </el-col>

          </el-row>
        </div>
      </template>

      <el-table :data="orders">
        <el-table-column label="时间" width="150" prop="createtime"></el-table-column>
        <el-table-column label="用户名" width="150" prop="name"></el-table-column>
        <el-table-column label="用户邮箱(号码)" width="250" prop="email"></el-table-column>
        <el-table-column label="操作" align="right">

          <template #default="scope">
            <el-button @click="showOrderDetail(scope.row)" type="primary">办理入住</el-button>
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
        v-model="dialogVisible_checkIn"
        title="办理入住"
        width="70%"
        :before-close="handleClose"
    >
      <el-table :data="orderDetail">
        <el-table-column prop="roomType" label="房间类型" width="100"></el-table-column>
        <el-table-column prop="roomNumber" label="房号" width="100"></el-table-column>
        <el-table-column prop="realName" label="入住人姓名" width="120"></el-table-column>
        <el-table-column prop="identificationNumber" label="入住人身份号码" width="180"></el-table-column>
        <el-table-column prop="phone" label="入住人号码" width="150"></el-table-column>
        <el-table-column prop="totaldeposit" label="押金" width="60"></el-table-column>
        <el-table-column width="180">
          <template #default="scope">
            模拟核对身份证号码过程
          </template>
        </el-table-column>
        <el-table-column label="操作" align="right">
          <template #default="scope">
            <el-button @click="submitCheckIn(scope.row)" type="primary">确认入住</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import orderAPI from "@/api/order";
import cookie from "@/utils/cookie";

export default {
  name: "checkIn",
  data() {
    return {
      orders: [
        {
          createtime: "2019-01-01",
          name: "张三",
          email: "1321321"
        }
      ],
      query: {
        orderstatus: '已支付未入住',
        nameOrEmail: "",
        hotelId: cookie.getTokenByName("hotelID"),
        pageSize: 10,
        total: 1000,
        currentPage: 1,
      },
      dialogVisible_checkIn: false,
      orderDetail: [
        {
          roomType: "标准间",
          roomNumber: "101",
          realName: "张三",
          identificationNumber: "123456789123456789",
          phone: "13213211321321",
          totaldeposit: "100"
        }
      ],
    }
  },
  created() {
    this.findPage();
  },

  methods: {
    findPage() {
      orderAPI.findPage(this.query).then(res => {
        console.log(res);
        this.orders = res.data.ordersList;
        this.query.total = res.data.total;
      })
    },
    findAll() {
      this.query.nameOrEmail = "";
      this.query.currentPage = 1;
      this.findPage();
    },
    showOrderDetail(row) {
      let params = {
        orderId: row.orderId,
        orderStatus: '未入住'
      }
      orderAPI.findOrderDetail(params).then(res => {
        this.orderDetail = res.data;
        this.dialogVisible_checkIn = true;
      })
    },
    submitCheckIn(row) {
      let params = {
        orderId: row.orderId,
        roomId: row.roomId,
        realUserId: row.realUserId
      }
      orderAPI.submitCheckIn(params).then(res => {

        let params = {
          orderId: row.orderId,
          orderStatus: '未入住'
        }
        orderAPI.findOrderDetail(params).then(res => {
          if (res.data == null || res.data.length == 0) {
            this.findPage();
            this.dialogVisible_checkIn = false;
          }
          this.orderDetail = res.data;

        })
      })
    }
  },
}
</script>

<style scoped>

</style>