<template>
  <n-message-provider>
    <RouterView v-if="isRouterAlive" />
  </n-message-provider>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { nextTick, ref, inject, provide } from 'vue'

const isRouterAlive = ref(true)

const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

provide('reload', reload)
</script>
