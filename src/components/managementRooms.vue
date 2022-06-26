<template>
  <div id="managementRoom">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-row align="middle">
            <el-col :span="4" style="display: flex">
              <el-input v-model="query.roomNumber" placeholder="房号"></el-input>
              <el-select style="margin-left: 10px" v-model="query.type" class="m-2" placeholder="房间类型">
                <el-option
                    v-for="item in roomsType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="3" style="display: flex">
              <el-button @click="findPage()" style="margin-left: 10px" type="primary">搜索</el-button>

              <el-button @click="findAll()" style="margin-left: 10px" type="primary">查询全部</el-button>

            </el-col>
            <el-col :span="3" :offset="14">
              <el-button @click="dialogVisible_addRoom=true" round type="primary">添加房间</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
      <el-table :data="tableData_rooms" style="width: 100%">
        <el-table-column prop="roomtype" label="类型" width="180"/>
        <el-table-column prop="roomnumber" label="房号" width="180"/>
        <el-table-column prop="roomstatus" label="状态" width="180"/>
        <el-table-column prop="roomdescribe" label="备注信息"/>

        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button link type="primary" size="small" @click="handleClick"
            >编辑
            </el-button
            >
            <el-button link type="primary" size="small">移除</el-button>
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
        v-model="dialogVisible_addRoom"
        title="添加房间"
        width="30%"
        :before-close="handleClose"
    >
      <el-form v-model="room_AddData" label-width="100px" label-position="left">

        <el-form-item label="房间类型">
          <el-select v-model="room_AddData.roomtype" class="m-2" placeholder="房间类型">
            <el-option
                v-for="item in roomsType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="房号">
          <el-input v-model="room_AddData.roomnumber" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="价钱">
          <el-input v-model="room_AddData.roomprice" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="押金">
          <el-input v-model="room_AddData.roomdeposit" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="room_AddData.roomdescribe"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible_addRoom = false">取消</el-button>
        <el-button type="primary" @click="addRoom()"
        >添加</el-button
        >
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>

import roomAPI from "@/api/room";

export default {
  name: "managementRooms",
  data() {
    return {
      tableData_rooms: [
        {
          roomtype: '单人房',
          roomnumber: 'A101',
          roomstatus: '入住',
          roomdescribe: ""
        },
      ],
      roomsType: [
        {
          value: '单人间',
          label: '单人间',
        }, {
          value: '双人间',
          label: '双人间',
        }, {
          value: '三人间',
          label: '三人间',
        }, {
          value: '四人间',
          label: '四人间',
        },
      ],
      query: {
        type: "",
        roomNumber: "",
        pageSize: 10,
        total: 1000,
        currentPage: 1,
      },
      dialogVisible_addRoom: false,
      room_AddData: {
        roomtype: "",
        roomnumber: "",
        roomprice: null,
        roomdeposit: null,
        roomdescribe: ""
      }
    }
  },
  created() {
    this.findPage()
  },
  methods: {
    findPage() {
      roomAPI.findRoomsPage(this.query).then(res => {
        this.tableData_rooms = res.data.roomList
        this.query.total = res.data.total
      })
    },
    addRoom() {
      roomAPI.addRooms(this.room_AddData).then(res => {
        this.findPage()
        this.room_AddData = ""
        this.dialogVisible_addRoom = false
      })
    },
    findAll() {
      this.query.roomNumber = ""
      this.query.type = ""
      this.query.currentPage = 1
      this.findPage()
    }
  }
}
</script>

<style lang="scss">
#managementRoom {

}
</style>