<template>
  <n-flex align="center" justify="center" style="height: 100%">
    <div class="center-bg">
      <h2>普通用户注册</h2>
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
              @keyup.enter="submit"
            />
          </n-form-item>
          <n-form-item label="重复密码">
            <n-input
              v-model:value="repeatPassword"
              type="password"
              placeholder="请重复输入密码"
              @keyup.enter="submit"
            />
          </n-form-item>
          <n-flex align="center" justify="center" style="margin-bottom: 20px">
            <n-button type="primary" @click="submit">提交</n-button>
            <n-button type="info" @click="clearInput">清空</n-button>
            <n-button type="tertiary" @click="adminLogin">管理员登录</n-button>
          </n-flex>
        </n-form>
      </n-flex>
    </div>
  </n-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
import { useMessage } from 'naive-ui'

const axios: any = inject('axios')
const router = useRouter()

const username = ref('')
const password = ref('')
const repeatPassword = ref('')
const message = useMessage()

var api = 'http://localhost:8080/register'

function submit() {
  if (password.value != repeatPassword.value) {
    message.error('两次输入的密码不一致，请重新输入。')
    clearInput(false)
    return
  }

  var data = {
    username: username.value,
    password: password.value,
    repeatPassword: repeatPassword.value
  }

  axios
    .post(api, data)
    .then((result) => {
      var res = result.data

      if (res.status == 200) {
        message.success('注册成功!返回登录页……')
        setTimeout(() => {
          router.push('/login')
        }, 1000)
      } else {
        message.error('注册失败……服务器说：' + res.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function clearInput(clearUsername = true) {
  if (clearUsername) username.value = ''

  password.value = ''
  repeatPassword.value = ''
}

function adminLogin() {
  router.push({
    name: 'login',
    query: {
      mode: 'admin'
    }
  })
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
