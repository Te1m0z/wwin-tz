<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <AppHeader/>
  <main class="main-content">
    <div class="container">
      <slot />
    </div>
  </main>
  <AppFooter />
</template>

<style lang="scss">
.main-content {
  flex-grow: 1;
}
</style>
