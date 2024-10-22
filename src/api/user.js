import axios from '@/utils/axios.js'
//发送到/api/...路径,交给nginx进行处理,发往后端正确路径,解决跨域问题
export const userRegisterService = (registerOrLoginData)=>{
    return axios.post('/api/user',registerOrLoginData);
}

export const userLoginService = (registerOrLoginData)=>{
    return axios.post('/api/token',registerOrLoginData);
}