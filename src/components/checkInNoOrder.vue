<template>
  <div id="checkInNoOrder">
    <el-card>
      <div class="chooseRooms">

        <el-form style="border-right: 4px #f6f6f6 solid;padding-right: 5px;margin-right: 5px;width: 950px;"
                 label-width="100px"
                 label-position="left">

          <el-form-item label="房间类型">

            <el-select v-model="chooseRoom.chooseTypeValue" class="m-2" placeholder="房间类型">
              <el-option
                  v-for="item in chooseRoom.type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="房号">
            <el-select
                v-model="chooseRoom.chooseRoomValue"
                value-key="id"
                filterable
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="选择或搜索房号"
                @change="updatePrice()"
            >
              <el-option
                  v-for="item in chooseRoom.roomNumber"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disable"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="入住人信息">
            <el-select
                v-model="chooseRoom.chooseRealInfoValue"
                value-key="id"
                multiple
                default-first-option
                :reserve-keyword="false"
                placeholder="选择或搜索或添加入住人"
                @change="updateChooseRealUser()"
            >
              <el-option
                  v-for="item in chooseRoom.realInfo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-button @click="dialogVisible_AddRealInfo=true" type="primary" style="margin-left: 15px">
              <el-icon style="vertical-align: middle">
                <CirclePlus/>
              </el-icon>
              <span style="vertical-align: middle"> 添加 </span>
            </el-button>
          </el-form-item>


          <el-form-item label="人数">
            <el-input disabled style="width: 50px" :placeholder='chooseRoom.peopleNumber+" 人"'
            />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
                v-model="chooseRoom.time"
                type="date"
                placeholder="入店日期"
                disabled
            />
          </el-form-item>
          <el-form-item label="入住天数">
            <!--            <el-input v-model="chooseRoom.checkInDays" style="width: 150px" placeholder="预计入住天数"/>-->
            <el-input-number style="width: 80px;" v-model="chooseRoom.checkInDays" :controls="false"/>
          </el-form-item>
          <el-form-item label="价格">
            <el-input disabled style="width: 80px" :placeholder="chooseRoom.price+ ' 元'"/>
          </el-form-item>
          <el-form-item label="押金">
            <el-input disabled style="width: 80px" :placeholder="chooseRoom.roomdeposit+ ' 元'"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="chooseRoom.remark" type="textarea"/>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetChooseRoom()">重置</el-button>
            <el-button type="primary" @click="onsubmitChooseRoom()">确认</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="hasChosenRoom" style="width: 100%">
          <el-table-column prop="roomtype" label="类型" width="120"/>
          <el-table-column prop="roomnumber" label="房号" width="120"/>
          <el-table-column prop="realname" label="入住人"/>
        </el-table>

      </div>
      <el-button style="float: right;margin-bottom: 20px" type="primary" @click="dialogVisible_submitOrder = true">确认
      </el-button>
      <el-button style="float: right;margin-bottom: 20px;margin-right: 10px;">重置</el-button>
    </el-card>
    <el-dialog
        v-model="dialogVisible_AddRealInfo"
        title="添加入住人信息"
        width="25%"
        :before-close="handleClose"
    >
      <el-form :model="addRealUserData"
               label-width="80px"
               label-position="left"

      >
        <el-form-item label="姓名">

          <el-input v-model="addRealUserData.realname"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select
              v-model="addRealUserData.gender"
              placeholder="选择性别"
          >
            <el-option
                v-for="item in gender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number style="width: 80px;" v-model="addRealUserData.age" :controls="false"/>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="addRealUserData.identificationnumber"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="addRealUserData.phone"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelAddRealUser()">取消</el-button>
        <el-button type="primary" @click="submitAddRealUser()"
        >添加</el-button
        >
      </span>
      </template>
    </el-dialog>
    <el-dialog
        v-model="dialogVisible_submitOrder"
        title="完成入住"
        width="60%"
        :before-close="handleClose"
    >
      <el-table :data="hasChosenRoom" style="width: 100%">
        <el-table-column prop="roomtype" label="类型" width="120"/>
        <el-table-column prop="roomnumber" label="房号" width="120"/>
        <el-table-column prop="realname" label="入住人" width="150"/>
        <el-table-column prop="checkInDays" label="预计入住天数"/>
        <el-table-column prop="time" label="入住时间"/>
        <el-table-column prop="roomdeposit" label="房间押金"/>
        <el-table-column prop="totalroomdeposit" label="价钱"/>
      </el-table>
      <template #footer>
        <el-button round disabled type="danger" size="large">¥：{{
            this.hasChosenRoom.reduce((total, item) => {
              return total + item.totalroomdeposit
            }, 0)
          }}
        </el-button>
        <el-button style="width: 100px;" type="primary" @click="submitOrder()">入住</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import roomAPI from "@/api/room";
import realUserAPI from "@/api/realUser";
import orderAPI from "@/api/order";
import cookie from "@/utils/cookie";

export default {
  name: "checkInNoOrder",
  data() {
    return {
      roomsTypes: [
        {
          type: "单人间",
          describe: "上电经典单人间，给你独处的空间",
          price: 66,
          url: 'https://thecomputer-1308737201.cos.ap-shanghai.myqcloud.com/hotelImage/%E5%8D%95%E4%BA%BA%E9%97%B4.jpg'
        }, {
          type: "双人间",
          describe: "上电经典双人间，给你独处的空间",
          price: 122,
          url: 'https://thecomputer-1308737201.cos.ap-shanghai.myqcloud.com/hotelImage/%E5%8F%8C%E4%BA%BA%E9%97%B4.jpg'

        }, {
          type: "三人间",
          describe: "上电经典三人间，给你独处的空间",
          price: 155,
          url: 'https://thecomputer-1308737201.cos.ap-shanghai.myqcloud.com/hotelImage/%E4%B8%89%E4%BA%BA%E9%97%B4.jpg'

        }, {
          type: "四人间",
          describe: "上电经典四人间，给你独处的空间",
          price: 222,
          url: 'https://thecomputer-1308737201.cos.ap-shanghai.myqcloud.com/hotelImage/%E5%9B%9B%E4%BA%BA%E9%97%B4.jpg'

        },
      ],
      // 预定房间的选择房间数据
      chooseRoom: {
        chooseTypeValue: '',
        type: [
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
          },],
        chooseRoomValue: '',
        roomNumber: [
          {
            value: 'A101',
            label: 'A101'
          }, {
            value: 'A102',
            label: 'A102'
          }, {
            value: 'A103',
            label: 'A103'
          }, {
            value: 'A104',
            label: 'A104'
          },],
        chooseRealInfoValue: '',
        realInfo: [{}],
        peopleNumber: 0,
        time: this.formatDate(new Date()),
        price: 0,
        roomdeposit: 0,
        checkInDays: 1,
        remark: ""
      },
      //已选的房间信息
      hasChosenRoom: [],
      addRealUserData: {
        realname: "",
        gender: "",
        age: null,
        identificationnumber: "",
        phone: ""
      },
      gender: [
        {
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        },
      ],
      dialogVisible_submitOrder: false,
      dialogVisible_AddRealInfo: false,
    }
  },
  created() {
    this.findRealPage()
  },
  methods: {
    findRealPage() {
      let params = {
        userid: null
      }
      realUserAPI.findRealPage(params).then(res => {
        this.chooseRoom.realInfo.length = res.data.length
        for (let i = 0; i < res.data.length; i++) {
          let realUser = res.data[i]
          this.chooseRoom.realInfo[i] = {
            value: realUser,
            label: realUser.realname
          }
        }
      })
    },
    //改变人数
    updateChooseRealUser() {
      this.chooseRoom.peopleNumber = this.chooseRoom.chooseRealInfoValue.length
    },
    //  改变价钱
    updatePrice() {
      this.chooseRoom.price = this.chooseRoom.chooseRoomValue.roomprice
      this.chooseRoom.roomdeposit = this.chooseRoom.chooseRoomValue.roomdeposit
    },
    onsubmitChooseRoom() {
      if (!this.validateChooseRoomForm()) {
        return
      }
      let realname = ""
      for (let i = 0; i < this.chooseRoom.chooseRealInfoValue.length; i++) {
        realname += " " + this.chooseRoom.chooseRealInfoValue[i].realname
      }
      let chooseInfo = {
        realname: realname,
        roomnumber: this.chooseRoom.chooseRoomValue.roomnumber,
        roomtype: this.chooseRoom.chooseTypeValue,
        roomprice: this.chooseRoom.chooseRoomValue.roomprice,
        peoplenumber: this.chooseRoom.peopleNumber,
        checkInDays: this.chooseRoom.checkInDays,
        time: this.chooseRoom.time,
        price: this.chooseRoom.price,
        totalroomdeposit: this.chooseRoom.roomdeposit,
        roomdeposit: this.chooseRoom.chooseRoomValue.roomdeposit,
        remark: this.chooseRoom.remark,
        room: this.chooseRoom.chooseRoomValue,
        realUsers: this.chooseRoom.chooseRealInfoValue,
      }
      this.hasChosenRoom.push(chooseInfo)

      this.resetChooseRoom()
    },
    //  重置表单chooseRoom
    resetChooseRoom() {
      this.chooseRoom.chooseTypeValue = ''
      this.chooseRoom.chooseRoomValue = ''
      this.chooseRoom.chooseRealInfoValue = ''
      this.chooseRoom.peopleNumber = 0
      this.chooseRoom.price = 0
      this.chooseRoom.roomdeposit = 0
      this.chooseRoom.checkInDays = 1
      this.chooseRoom.remark = ""
    },
    //  重置表单hasChosenRoom
    resetHasChosenRoom() {
      this.hasChosenRoom.length = 0
    },
    formatDate(date) {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + "-" + month + "-" + day
    },
    //提交订单
    submitOrder() {
      //处理数据
      let order = {
        userid: 1,
        totalpeoplenumber: this.hasChosenRoom.reduce((total, item) => {
          return total + item.peoplenumber
        }, 0),
        orderstatus: "已支付未入住",
        totalprice: 0,
        totaldeposit: this.hasChosenRoom.reduce((total, item) => {
          return total + item.room.roomdeposit
        }, 0),
        createtime: this.formatDate(new Date()),
        remark: this.hasChosenRoom.reduce((total, item) => {
          return total + item.remark
        }, ","),
        hotelid: cookie.getTokenByName("hotelID"),
      }
      //提交数据
      orderAPI.submitOrder(order).then(res => {
        let orderDetails = []
        for (let i = 0; i < this.hasChosenRoom.length; i++) {
          for (let j = 0; j < this.hasChosenRoom[i].realUsers.length; j++) {
            let orderDetail = {
              orderid: res.data,
              roomid: this.hasChosenRoom[i].room.id,
              realuserid: this.hasChosenRoom[i].realUsers[j].id,
              orderstatus: "未入住",
              expectedcheckintime: this.hasChosenRoom[i].time,
              expectedcheckindays: this.hasChosenRoom[i].checkInDays,
              roomprice: this.hasChosenRoom[i].roomprice,
              roomdeposit: this.hasChosenRoom[i].room.roomdeposit,
            }
            orderDetails.push(orderDetail)
          }
        }
        orderAPI.submitOrderDetails(orderDetails).then(res => {

          for (let i = 0; i < orderDetails.length; i++) {
            let params = {
              orderId: orderDetails[i].orderid,
              roomId: orderDetails[i].roomid,
              realUserId: orderDetails[i].realuserid
            }
            orderAPI.submitCheckIn(params).then(res => {
            })
          }

          this.resetHasChosenRoom()
          this.resetChooseRoom()
          this.dialogVisible_submitOrder = false
          this.$message({
            message: "谢谢惠顾",
            type: "success"
          })
        })

      })
    },
    submitAddRealUser() {
      if (!this.validateAddRealUserForm()) {
        return
      }
      realUserAPI.addRealUser(this.addRealUserData).then(res => {
        this.addRealUserData.id = res.data
        this.chooseRoom.realInfo.push({
          value: res.data,
          label: res.data.realname
        })
        this.chooseRoom.chooseRealInfoValue.push(res.data)
        this.updateChooseRealUser()
        // this.chooseRoom.realInfo.push(data)
        // this.chooseRoom.chooseRealInfoValue.length = this.chooseRoom.chooseRealInfoValue.length + 1
        this.dialogVisible_AddRealInfo = false
        this.resetAddRealUserData()
      })
    },
    //重置表单addRealUserData
    resetAddRealUserData() {
      this.addRealUserData.realname = ""
      this.addRealUserData.identificationnumber = ""
      this.addRealUserData.phone = ""
      this.addRealUserData.age = null
      this.addRealUserData.gender = ""
    },

    //验证身份证号码
    validateIdentityNumber(identityNumber) {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      return reg.test(identityNumber)
    },
    //验证手机号码
    validatePhone(phone) {
      let reg = /^1[3456789]\d{9}$/
      return reg.test(phone)
    },

    //表单验证
    validateChooseRoomForm() {
      if (this.chooseRoom.chooseRoomValue == null || this.chooseRoom.chooseRoomValue == '') {
        this.$message({
          message: "请选择房间",
          type: "warning"
        })
        return false
      }
      if (this.chooseRoom.peopleNumber == null || this.chooseRoom.peopleNumber == 0) {
        this.$message({
          message: "请选择入住人",
          type: "warning"
        })
        return false
      } else {
        if (this.chooseRoom.chooseTypeValue === '单人间') {
          if (this.chooseRoom.peopleNumber > 1) {
            this.$message({
              message: "单人间最多只能入住一个人",
              type: "warning"
            })
            return false
          }
        } else if (this.chooseRoom.chooseTypeValue === '双人间') {
          if (this.chooseRoom.peopleNumber > 2) {
            this.$message({
              message: "双人间最多只能入住两个人",
              type: "warning"
            })
            return false
          }
        } else if (this.chooseRoom.chooseTypeValue === '三人间') {
          if (this.chooseRoom.peopleNumber > 3) {
            this.$message({
              message: "三人间最多只能入住三个人",
              type: "warning"
            })
            return false
          }
        } else if (this.chooseRoom.chooseTypeValue === '四人间') {
          if (this.chooseRoom.peopleNumber > 4) {
            this.$message({
              message: "四人间最多只能入住四个人",
              type: "warning"
            })
            return false
          }
        }
      }
      if (this.chooseRoom.time == null || this.chooseRoom.time == '') {
        this.$message({
          message: "请选择入住时间",
          type: "warning"
        })
        return false
      }
      return true
    },
    validateAddRealUserForm() {
      if (this.addRealUserData.realname == null || this.addRealUserData.realname == '') {
        this.$message({
          message: "请输入真实姓名",
          type: "warning"
        })
        return false
      }
      if (this.addRealUserData.gender == null || this.addRealUserData.gender == '') {
        this.$message({
          message: "请选择性别",
          type: "warning"
        })
        return false
      }
      if (this.addRealUserData.age == null || this.addRealUserData.age < 0 || this.addRealUserData.age > 150) {
        this.$message({
          message: "请输入正确的年龄",
          type: "warning"
        })
        return false
      }
      if (this.addRealUserData.identificationnumber == null || this.addRealUserData.identificationnumber == '') {
        this.$message({
          message: "请输入身份证号码",
          type: "warning"
        })
        return false
      } else {
        if (!this.validateIdentityNumber(this.addRealUserData.identificationnumber)) {
          this.$message({
            message: "请输入正确的身份证号码",
            type: "warning"
          })
          return false
        }
      }
      if (this.addRealUserData.phone == null || this.addRealUserData.phone == '') {
        this.$message({
          message: "请输入手机号码",
          type: "warning"
        })
        return false
      } else {
        if (!this.validatePhone(this.addRealUserData.phone)) {
          this.$message({
            message: "请输入正确的手机号码",
            type: "warning"
          })
          return false
        }
      }
      return true
    },
    cancelAddRealUser() {
      this.dialogVisible_AddRealInfo = false
      this.resetAddRealUserData()
    },

  },
  watch: {
    //  监听选择房间的天数
    'chooseRoom.checkInDays': function (val) {
      this.chooseRoom.price = this.chooseRoom.chooseRoomValue.roomprice * val
      this.chooseRoom.roomdeposit = this.chooseRoom.chooseRoomValue.roomdeposit * val
    },
    //  监听选择房间的类型
    'chooseRoom.chooseTypeValue':
        function (val) {
          let query = {
            roomstatus: "空闲",
            roomtype: val
          }
          roomAPI.findAllRoomsByStatusAndType(query).then(res => {
            this.chooseRoom.roomNumber.length = res.data.length
            this.chooseRoom.chooseRoomValue = ""
            for (let i = 0; i < res.data.length; i++) {
              var flag = false
              for (let j = 0; j < this.hasChosenRoom.length; j++) {
                if (res.data[i].roomnumber === this.hasChosenRoom[j].roomnumber) {
                  flag = true
                }
              }
              if (flag) {
                this.chooseRoom.roomNumber[i] = {
                  value: res.data[i],
                  label: res.data[i].roomnumber,
                  disable: true
                }
              } else {
                this.chooseRoom.roomNumber[i] = {
                  value: res.data[i],
                  label: res.data[i].roomnumber,
                }
              }
              flag = false

            }
          })
        }
  }

}
</script>

<style scoped>

.chooseRooms {
  display: flex;
}
</style>