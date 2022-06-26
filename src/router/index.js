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
                    path: 'managementRooms',
                    component: managementRooms
                }
            ]
        }
    ]
})
router.beforeEach((to, from) => {

})
export default router