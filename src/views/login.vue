<template>
  <n-flex align="center" justify="center" style="height: 100%">
    <div class="center-bg">
      <h2 v-if="mode == 'user'">普通用户登录</h2>
      <h2 v-if="mode == 'admin'">管理员登录</h2>
      <n-flex align="center" justify="center" style="margin-top: 20px">
        <n-form size="medium" class="form-bg">
          <n-flex align="center" justify="center" class="input_block"> </n-flex>
          <n-form-item label="用户名">
            <n-input v-model:value="username" placeholder="请输入用户名" />
          </n-form-item>
          <n-form-item label="密码">
            <n-input
              v-model:value="password"
              type="password"
              placeholder="请输入密码"
              @keyup.enter="login"
            />
          </n-form-item>
          <n-flex align="center" justify="center" style="margin-bottom: 20px">
            <n-button type="primary" @click="login">登录</n-button>
            <n-button type="info" @click="goRegister">注册</n-button>
            <n-button type="tertiary" @click="adminLogin">{{
              mode == 'user' ? '管理员登录' : '用户登录'
            }}</n-button>
          </n-flex>
        </n-form>
      </n-flex>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { inject } from 'vue'
import { useMessage } from 'naive-ui'
import { userStore } from '../store/userStore.js'

const axios: any = inject('axios')
const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const message = useMessage()

var api = 'http://localhost:8080/login'

console.log(userStore.userName)

let mode = ref('user')
if (route.query.mode == 'admin') {
  mode.value = 'admin'
}

function login() {
  var data = {
    username: username.value,
    password: password.value
  }

  if (data.username == '' || data.password == '') {
    message.error('用户名或密码不能为空。')
    return
  } else if (data.username == 'admin' && mode.value == 'user') {
    message.warning('请移步管理员登录。')
    return
  }

  axios
    .post(api, data)
    .then((result) => {
      var res = result.data
      console.log(res)

      if (res.status == 200) {
        userStore.userName = data.username
        message.success('登录成功!正在跳转……')
        setTimeout(() => {
          router.push('/index')
        }, 1000)
      } else {
        message.error('登录失败……请重试。')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function goRegister() {
  router.push('/register')
}

function adminLogin() {
  mode.value = mode.value == 'user' ? 'admin' : 'user'
  console.log(mode)
}
</script>

<style scoped lang="scss">
.center-bg {
  width: 400px;
  border-radius: 6px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);

  padding: 20px;
  box-sizing: border-box;

  h2 {
    text-align: center;
  }
  .form-bg {
    width: 80%;
  }
  .input_block {
    width: 100%;
  }
}
</style>
