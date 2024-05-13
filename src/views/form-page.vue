<template>
  <n-flex class="index-bg" vertical align="center" justify="center">
    <div class="menu-bg">
      <navigator />
    </div>
    <n-flex vertical align="center" justify="center">
      <h1>物流管理系统 - {{ pageTitle }}物流信息</h1>

      <n-flex align="center" justify="center">
        <n-form size="medium" class="form-bg" style="width: 400px">
          <n-flex align="center" justify="center" class="input_block"> </n-flex>
          <n-form-item label="物流编号">
            <n-input
              readonly
              disabled
              v-model:value="io_inObj.number"
              type="number"
              placeholder="请输入物流编号"
            />
          </n-form-item>
          <n-form-item label="物流备注">
            <n-input v-model:value="io_inObj.message" placeholder="请输入物流备注，默认为无" />
          </n-form-item>
          <n-form-item label="物流发货地址">
            <n-input v-model:value="io_inObj.shippingAddress" placeholder="请输入物流发货地址" />
          </n-form-item>
          <n-form-item label="物流收货地址">
            <n-input v-model:value="io_inObj.deliveryAddress" placeholder="请输入物流收货地址" />
          </n-form-item>
          <n-form-item label="运费">
            <n-input type="number" v-model:value="io_inObj.price" placeholder="请输入物流运费" />
          </n-form-item>
          <n-form-item label="送货员">
            <n-input v-model:value="io_inObj.courier" placeholder="请输入物流公司" />
          </n-form-item>

          <n-flex align="center" justify="center" style="margin-bottom: 20px">
            <n-button type="primary" @click="submit">提交</n-button>
            <n-button type="info" @click="clearInput">清空</n-button>
            <n-button type="warning" @click="randomFill">随机生成</n-button>
          </n-flex>
        </n-form>
      </n-flex>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'
import generator from 'chinese-address-generator'
import { useMessage } from 'naive-ui'

const message = useMessage()
const axios: any = inject('axios')
const router = useRouter()
const route = useRoute()

type io_in = {
  id: number
  number: number
  message: string
  shippingAddress: string
  deliveryAddress: string
  price: Number
  date: null
  courier: string
}

var randNum = Math.floor(Math.random() * 1000000).toString()

let io_inObj = ref({
  id: null,
  number: randNum,
  message: '',
  shippingAddress: '',
  deliveryAddress: '',
  price: '0',
  date: null,
  courier: ''
})

let pageTitle = ref('添加')
let mode = ref('add')

if (route.query.id) {
  pageTitle.value = '修改'
  mode.value = 'edit'
  axios
    .get('http://localhost:8080/cargo/get/' + route.query.id)
    .then((result) => {
      var res = result.data

      if (res.status == 200) {
        io_inObj.value = res.data
      } else {
        message.error('获取数据失败……请重试。')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function clearInput() {
  io_inObj.value = {
    id: null,
    number: randNum,
    message: '',
    shippingAddress: '',
    deliveryAddress: '',
    price: '0',
    date: null,
    courier: ''
  }
}

function randomFill() {
  io_inObj.value = {
    id: null,
    number: randNum,
    message: '无',
    // https://github.com/moonrailgun/chinese-address-generator
    shippingAddress: generator.generateLevel3().region,
    deliveryAddress: generator.generateLevel3().region,
    price: Math.floor(Math.random() * 1000).toString(),
    date: null,
    courier: '张三'
  }
}

function submit() {
  Object.keys(io_inObj.value).forEach((key) => {
    if (io_inObj.value[key] == '' && key != 'date' && key != 'id') {
      message.error('请填写完整信息。')
      return
    }
  })

  if (mode.value == 'edit') {
    axios
      .put('http://localhost:8080/cargo/update', io_inObj.value)
      .then((result) => {
        var res = result
        console.log(res)

        if (res.status == 200) {
          message.success('修改成功!正在回到主页……')
          setTimeout(() => {
            router.push('/index')
          }, 1000)
        } else {
          message.error('修改失败……请重试。')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    return
  } else {
    axios
      .post('http://localhost:8080/cargo/add', io_inObj.value)
      .then((result) => {
        var res = result
        console.log(res)

        if (res.status == 200) {
          message.success('添加成功!正在回到主页……')
          setTimeout(() => {
            router.push('/index')
          }, 1000)
        } else {
          message.error('添加失败……请重试。')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
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
