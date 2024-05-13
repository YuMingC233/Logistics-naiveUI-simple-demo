<template>
  <n-menu :options="menuOptions" mode="horizontal" default-value="go-back-home" />
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { userStore } from '../store/userStore.js'
import {
  Add as Add,
  HomeOutline as HomeIcon,
  PersonSharp as User,
  Hammer as Hammer,
  Exit as Exit
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'index' // !IMPORTANT 如果没有在router/index.ts中定义name为index的路由，菜单会直接失效
          }
        },
        { default: () => '回家' }
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'form-page'
          }
        },
        { default: () => '添加物流信息' }
      ),
    key: 'form-add-upd',
    icon: renderIcon(Add)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'user-mng'
          }
        },
        { default: () => '用户管理' }
      ),
    key: 'user-mng',
    icon: renderIcon(User),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'modify-pwd'
              }
            },
            { default: () => '修改密码' }
          ),
        key: 'modify-pwd',
        icon: renderIcon(Hammer)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: 'login'
              }
            },
            { default: () => '退出登录' }
          ),
        key: 'exit',
        icon: renderIcon(Exit),
        onClick: () => {
          userStore.userName = null
        }
      }
    ]
  }
]
</script>
