<template>
    <!-- 注册表单 -->
    <el-form 
        ref="registerForm" 
        size="large"
        autocomplete="off" 
        :model="registerOrLoginData"
        :rules="registerOrLoginDataRules"
        v-if="isRegister" 
    >
        <el-form-item>
            <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="userName">
            <el-input 
                :prefix-icon="User" 
                placeholder="请输入用户名" 
                v-model="registerOrLoginData.userName"
            />
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input 
                :prefix-icon="Lock" 
                type="password" 
                placeholder="请输入密码" 
                v-model="registerOrLoginData.pwd"
            />
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
            <el-button type="primary" auto-insert-space @click="register">
                注册
            </el-button>
        </el-form-item>
        <el-form-item >
            <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterOrLoginData()">
                ← 返回
            </el-link>
        </el-form-item>
    </el-form>
    <!-- 登录表单 -->
    <el-form 
        ref="loginForm" 
        size="large" 
        autocomplete="off" 
        :model="registerOrLoginData"
        :rules="registerOrLoginDataRules"
        v-else
    >
        <el-form-item>
            <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="userName">
            <el-input 
                :prefix-icon="User"
                placeholder="请输入用户名"
                v-model="registerOrLoginData.userName"
            />
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input 
                name="password" 
                :prefix-icon="Lock" 
                type="password" 
                placeholder="请输入密码"
                v-model="registerOrLoginData.pwd"
            />
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
            <el-button  type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item >
            <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterOrLoginData()">
                注册 →
            </el-link>
        </el-form-item>
    </el-form>
</template>

<script setup>
    import { ref } from "vue";
    import { ElMessage } from 'element-plus';
    import { User, Lock } from '@element-plus/icons-vue';
    import { userRegisterService,userLoginService } from '@/api/user.js';
    import { useTokenStore } from '@/stores/token.js'
    import { useRouter} from 'vue-router';
    const router = useRouter();
    const tokenStore=useTokenStore();
    //用以显示或隐藏注册界面
    const isRegister = ref(false);
    //获取注册表单
    const registerForm = ref(null);
    //存储用户信息的结构
    const registerOrLoginData = ref({
        userName: '',
        pwd: ''
    });
    //用以校验登录或注册表单
    const registerOrLoginDataRules = ref({
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '请输入长度 3-10 的用户名', trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度必须为6~20位', trigger: 'blur' }
    ]
    });
    //注册操作
    const register = async ()=>{
        //当用户不满足用户名和密码条件时,不允许数据发往后端,直接返回
        const valid = await registerForm.value.validate();
        if (!valid) {
            return; 
        }
        let result = await userRegisterService(registerOrLoginData.value);
        ElMessage.success(result.msg? result.msg: '注册成功!');
    }
    //登录操作
    const login = async ()=>{
        let result = await userLoginService(registerOrLoginData.value);
        ElMessage.success(result.msg? result.msg: '登录成功!');
        tokenStore.setToken(result.data.token);
        router.push('/');
    }
    //清除数据
    const clearRegisterOrLoginData=()=>{
        registerOrLoginData.value={
            userName: '',
            pwd: ''
        }
    }      
</script>

<style scoped></style>
