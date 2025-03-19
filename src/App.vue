<script setup lang="ts">
  import Navbar from './components/utils/Navbar.vue';
  import Footer from './components/utils/Footer.vue';
</script>

<template>
  <div class="flex flex-col justify-between min-h-screen">
    <Navbar class=""></Navbar>
    
    <main class="w-full flex flex-auto">
      <RouterView />
    </main>
  
    <Footer class=""></Footer>
  </div>
</template>
