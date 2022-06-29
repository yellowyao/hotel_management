// import Vue from 'vue'
// import VueRouter from 'vue-router'

// 组件通过export暴露接口，路由中导入组件

// // 导入 vue-router 依赖
// Vue.use(VueRouter);

// export default new VueRouter({
//     routes: [{
//             path: '/', // 跳转路径
//             name: 'index', // 名称
//             component: index // 组件
//         }

//     ]
// });

// vue-Router@4.0+的写法
import login from "@/components/login";
import index_ from "@/components/index"
import checkIn from "@/components/checkIn"
import managementRooms from "@/components/managementRooms";
import checkInNoOrder from "@/components/checkInNoOrder";
import checkOut from "@/components/checkOut";
import rooms from "@/components/rooms";
import ECharLayout from "@/components/ECharLayout";
import expire from "@/components/histroy";
import {
    ElMessage
} from 'element-plus'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        }, {
            path: '/index',
            name: 'index',
            component: index_,
            children: [
                {
                    path: '/index/checkIn',
                    component: checkIn
                }, {
                    path: '/index/checkInNoOrder',
                    component: checkInNoOrder
                }, {
                    path: '/index/checkOut',
                    component: checkOut

                }, {
                    path: 'managementRooms',
                    component: managementRooms
                }, {
                    path: '/index/rooms',
                    component: rooms
                }, {
                    path: '/index',
                    component: ECharLayout
                }, {
                    path: '/index/expire',
                    component: expire
                }
            ]
        }
    ]
})
router.beforeEach((to, from) => {

})
export default router