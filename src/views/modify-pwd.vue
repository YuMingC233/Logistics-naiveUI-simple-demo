<template>
  <n-dialog-provider>
    <n-flex class="index-bg" vertical align="center" justify="center">
      <div class="menu-bg">
        <navigator />
      </div>
      <n-flex vertical align="center" justify="center">
        <h1>修改密码</h1>
        <n-flex align="center" justify="center" class="form-bg">
          <n-form size="medium" style="width: 350px">
            <n-form-item label="原密码">
              <n-input v-model:value="oldPwd" type="password" placeholder="请输入原密码" />
            </n-form-item>
            <n-form-item label="新密码">
              <n-input v-model:value="newPwd" type="password" placeholder="请输入新密码" />
            </n-form-item>
            <n-form-item label="确认新密码">
              <n-input v-model:value="confirmPwd" type="password" placeholder="请再次输入新密码" />
            </n-form-item>
            <n-flex align="center" justify="center" style="margin-bottom: 20px">
              <n-button type="primary" @click="modifyPwd">确认修改</n-button>
              <n-button type="warning" @click="clearInput">清空</n-button>
            </n-flex>
          </n-form>
        </n-flex>
      </n-flex>
    </n-flex>
  </n-dialog-provider>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { NButton, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { userStore } from '../store/userStore.js'

const oldPwd = ref('')
const newPwd = ref('')
const confirmPwd = ref('')
const router = useRouter()
const message = useMessage()
const axios: any = inject('axios')

function clearInput() {
  oldPwd.value = ''
  newPwd.value = ''
  confirmPwd.value = ''
}

function modifyPwd() {
  if (oldPwd.value === '' || newPwd.value === '' || confirmPwd.value === '') {
    message.error('请将信息填写完整。')
    return
  } else if (newPwd.value !== confirmPwd.value) {
    message.error('两次输入的新密码不一致。')
    return
  }

  const responce = async () => {
    await axios.put('http://localhost:8080/modifyPwd', {
      userName: userStore.userName,
      oldPwd: oldPwd.value,
      newPwd: newPwd.value
    })
  }
  responce()
    .then(() => {
      message.success('密码修改成功。3秒后自动跳转到登录页面……')
      clearInput()
      router.push({ name: 'login' })
    })
    .catch(() => {
      message.error('密码修改失败。')
    })
}

console.log(userStore.userName)
</script>

<style scoped lang="scss">
.index-bg {
  min-width: 1200px;
  margin: 0 auto;
  .menu-bg {
    width: 50vw;
    padding: 10px;
    box-sizing: border-box;
  }
  h1 {
    margin: 10px 0;
    text-align: center;
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
