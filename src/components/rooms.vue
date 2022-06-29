<template>
  <div>
    <el-card>
      <template #header>
        <el-row>
          <el-col :span="2">
            <el-input placeholder="输入房间号"></el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-select v-model="value" class="m-2" placeholder="Select">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="1" :offset="1">
            <el-button>查询</el-button>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button>查询全部</el-button>
          </el-col>
        </el-row>
      </template>
      <el-table>
        <el-table-column label="房号" width="100"></el-table-column>
        <el-table-column label="类型" width="100"></el-table-column>
        <el-table-column label="状态" width="100"></el-table-column>
        <el-table-column label="押金" width="100"></el-table-column>
        <el-table-column label="价格"></el-table-column>
        <el-table-column label="备注"></el-table-column>
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
export default {
  name: "rooms",
  data() {
    return {
      query: {
        roomNumber: "",
        type: "",
        roomstatus: "",
        pageSize: 10,
        total: 1000,
        currentPage: 1,
      },
    }
  }
}
</script>

<style scoped>

</style>