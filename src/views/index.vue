<template>
  <n-dialog-provider>
    <n-flex class="index-bg" vertical align="center" justify="center">
      <div class="menu-bg">
        <navigator />
      </div>
      <n-flex align="center" justify="center">
        <h1>物流管理系统</h1>
        <indexTable :pastData="tableData" />
      </n-flex>
    </n-flex>
  </n-dialog-provider>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { inject } from 'vue'

const axios: any = inject('axios')

// 创建一个响应式的数据
let tableData = ref([])

async function getData() {
  // 从服务器获取数据
  try {
    const res = await axios.get('http://localhost:8080/cargo/get')
    tableData.value = res.data
  } catch (err) {
    console.error(err)
  }
}

getData()
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
