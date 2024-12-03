<template>
  <div class="login">
    <div class="main">
      <h3 class="title">xxx后台管理系统</h3>
      <el-form
        class="form"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
      >
        <el-form-item label="" prop="username">
          <el-input v-model="ruleForm.username" placeholder="账号">
            <template #prefix>
              <el-icon><UserFilled size="14" /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="密码"
          >
            <template #prefix>
              <el-icon><Lock size="14" /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="code">
          <el-input
            v-model="ruleForm.code"
            type="code"
            placeholder="验证码"
            style="width: 60%"
          >
            <template #prefix>
              <el-icon><Monitor size="14" /></el-icon>
            </template>
          </el-input>
          <div class="code-img">
            <img :src="codeImg" @click="getCaptchaImageApi" />
          </div>
        </el-form-item>
      </el-form>
      <div class="handle">
        <el-checkbox
          v-model="ruleForm.isRememberMe"
          label="记住密码"
          size="large"
        />
      </div>
      <el-button class="btn" type="primary" @click="handleSubmit">
        登陆
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, useTemplateRef, onMounted } from 'vue'
import type { FormRules } from 'element-plus'
import { captchaImageApi, loginApi } from '@/api/login/index'
import { encrypt, decrypt } from '@/utils/jsencrypt'
const ruleFormRef = useTemplateRef('ruleFormRef')

const ruleForm = ref({
  username: '',
  password: '',
  code: '',
  uuid: '',
  isRememberMe: false
})
const validateAdmin = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateAdmin, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  code: [{ validator: validateCode, trigger: 'blur' }]
})
const getLocalStorage = () => {
  let username = localStorage.getItem('username')
  let password = decrypt(localStorage.getItem('password'))
  let isRememberMe = localStorage.getItem('isRememberMe')
  if (username && password && isRememberMe === '1') {
    ruleForm.value.username = username
    ruleForm.value.password = password
    ruleForm.value.isRememberMe = true
  }
}
const codeImg = ref('')
const getCaptchaImageApi = async () => {
  let result = await captchaImageApi()
  codeImg.value = `data:image/gif;base64,${result.img}`
  ruleForm.value.uuid = result.uuid
}
const handleSubmit = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (ruleForm.value.isRememberMe) {
        localStorage.setItem('username', ruleForm.value.username)
        localStorage.setItem('password', encrypt(ruleForm.value.password))
        localStorage.setItem('isRememberMe', '1')
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        localStorage.removeItem('isRememberMe')
      }
      let result = await loginApi(ruleForm.value)
      console.log(result)
    }
  })
}
onMounted(() => {
  getLocalStorage()
  getCaptchaImageApi()
})
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../../assets/images/login-bg.svg');
  .main {
    width: 400px;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 6px;
    .title {
      text-align: center;
      margin-bottom: 30px;
    }
    .form {
      .code-img {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: end;
        img {
          height: 30px;
        }
      }
    }
    .handle {
      margin-bottom: 25px;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
