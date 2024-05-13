<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
</template>

<script setup lang="ts">
import { h, ref, watch, inject } from 'vue'
import { NButton, useDialog, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()

const dialog = useDialog()
const message = useMessage()
const axios: any = inject('axios')
const reload = inject('reload')

// 定义数据类型
type io_in = {
  id: number
  number: number
  message: string
  shipping_address: string
  delivery_address: string
  price: Number
  date: string
  courier: string
}

// 创建表中的列
const createColumns = ({
  btnHandler
}: {
  btnHandler: (id: number, mode: any) => void
}): DataTableColumns<io_in> => {
  return [
    {
      title: '序号',
      key: 'id'
    },
    {
      title: '编号',
      key: 'number'
    },
    {
      title: '物流信息',
      key: 'message'
    },
    {
      title: '发货地址',
      key: 'shippingAddress'
    },
    {
      title: '收货地址',
      key: 'deliveryAddress'
    },
    {
      title: '价格',
      key: 'price'
    },
    {
      title: '创建日期',
      key: 'date',
      render(row) {
        return new Date(row.date).toLocaleDateString()
      }
    },
    {
      title: '快递员姓名',
      key: 'courier'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        const button = ['modify', 'delete'].map((buttonKey) => {
          return h(
            NButton,
            {
              size: 'small',
              onClick: () => btnHandler(row.id, buttonKey)
            },
            {
              default: () => (buttonKey === 'modify' ? '修改' : '删除')
            }
          )
        })
        return button
      }
    }
  ]
}

const columns = createColumns({
  btnHandler: (id: number, mode) => {
    if (mode === 'modify') {
      console.log('修改', id)
      router.push('/form-page?id=' + id)
    } else {
      dialog.warning({
        title: '警告',
        content: '你确定要删除？',
        positiveText: '确定',
        negativeText: '不确定',
        onPositiveClick: async () => {
          const res = await axios({
            method: 'delete',
            url: 'http://localhost:8080/cargo/delete',
            data: { id } // 请求参数放在请求体
          })
          if (res.data) {
            message.success('删除成功!')
            setTimeout(() => {
              reload()
            }, 500)
          }
        },
        onNegativeClick: () => {
          message.error('没事了。')
        }
      })
      console.log('删除', id)
    }
  }
})

const props = defineProps({
  pastData: Array as () => io_in[]
})

// 接收父组件传入的值
const pagination = false as const

// 创建一个响应式的数据
let data = ref(props.pastData)

// 监听数据变化
watch(
  () => props.pastData,
  (newVal) => {
    data.value = newVal
  }
)
</script>
