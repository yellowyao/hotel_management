<template>
  <div id="index">
    <div class="common-layout">
      <el-container>
        <el-header>
          <header_/>
        </el-header>
        <el-container>
          <el-aside width="250px">
            <el-menu
                active-text-color="#ffd04b"
                background-color="#333744"
                class="el-menu-vertical-demo"
                default-active="2"
                text-color="#fff"
                @open="handleOpen"
                @close="handleClose"
                router
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <location/>
                  </el-icon>
                  <span>办理业务</span>
                </template>
                <el-menu-item index="/index/checkIn">办理入住</el-menu-item>
                <el-menu-item index="./1-2">办理离店</el-menu-item>

              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <location/>
                  </el-icon>
                  <span>管理酒店</span>
                </template>
                <el-menu-item index="2-1">查看客房</el-menu-item>
                <el-menu-item index="/index/managementRooms">管理客房</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import header_ from "@/components/header";

export default {
  name: "index_",
  components: {
    header_
  }
}
</script>

<style lang="scss">
#index {
  .el-header {
    padding: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    height: 100vh;
  }
}

</style>