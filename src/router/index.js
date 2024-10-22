import { createRouter,createWebHistory } from 'vue-router';
import UserVue from '@/views/User.vue';
import MainVue from '@/views/Main.vue';
import { useTokenStore } from '@/stores/token';
const routes = [
    {   
        path: '/user',
        component: UserVue,
        meta: {
            requireAuth: false
        }
    },
    {
        path: '/',
        component: MainVue,
        meta: {
            //除了user界面外其余所有界面均需要登录得到token后才可以访问
            requireAuth: true
        }
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})
//在前端保证部分页面在用户登录后才能访问
router.beforeEach((to,from,next)=>{
    if(!to.meta.requireAuth){
        next();
        return;
    }
    const tokenStore = useTokenStore();
    if(tokenStore.token){
        next();
        return;
    }
    next('/user');
})

export default router;