import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useTokenStore } from '@/stores/token';
import { useRoute } from 'vue-router';
const instance = axios.create();
const router = useRoute();
instance.interceptors.request.use(
  // 拦截除了发往登录/注册界面的请求,对其添加token,便于后端校验
  config => {
    const isLoginOrRegister = config.url.includes('/api/login') || config.url.includes('/api/regist');
    if(isLoginOrRegister){
      return config;
    }
    const tokenStore = useTokenStore();
    if(tokenStore.token){
      config.headers.Authorization=tokenStore.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  result => {
      if (result.data.code == 1) {
          return result.data;
      }
      ElMessage.error(result.data.msg || '服务异常');
      return Promise.reject(result.data);
  },
  err => {
    if(err.response.status==401){
      ElMessage.error('请先登录');
      router.push('/login');
    }else{
      ElMessage.error(result.data.msg || '服务异常');
    }
      return Promise.reject(err);
  }
);
export default instance;