<template>
  <div id="checkIn">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-row align="middle">
            <el-col :span="4" style="display: flex">
              <el-input v-model="query.roomNumber" placeholder="用户名或用户邮箱" style="margin-left: 10px"></el-input>

            </el-col>
            <el-col :span="3" style="display: flex">
              <el-button @click="findPage()" style="margin-left: 10px" type="primary">搜索</el-button>

              <el-button @click="findAll()" style="margin-left: 10px" type="primary">查询全部</el-button>
            </el-col>

          </el-row>
        </div>
      </template>

      <el-table :data="orders">
        <el-table-column label="时间" width="150" prop="time"></el-table-column>
        <el-table-column label="用户名" width="150" prop="name"></el-table-column>
        <el-table-column label="用户邮箱(号码)" width="250" prop="email"></el-table-column>
        <el-table-column label="操作" align="right">

          <template #default="scope">
            <el-button @click="handleCheckIn(scope.row)" type="primary">办理入住</el-button>
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
  </div>
</template>

<script>
import orderAPI from "@/api/order";

export default {
  name: "checkIn",
  data() {
    return {
      orders: [
        {
          time: "2019-01-01",
          name: "张三",
          email: "1321321"
        }
      ],
      query: {
        orderstatus: '已支付未入住',
        nameOrEmail: "",
        pageSize: 10,
        total: 1000,
        currentPage: 1,
      },


    }
  },
  methods: {
    findPage() {
      orderAPI.findPage(this.query).then(res => {
        this.orders = res.data.data.list;
        this.query.total = res.data.data.total;
      })
    },
    findAll() {

    }
  },
}
</script>

<style scoped>

</style>