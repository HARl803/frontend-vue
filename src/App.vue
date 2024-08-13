<template>
  <div id="app">
    <div class="container">
      <Navbar />
    </div>
    <main class="container mt-4">
      <router-view />
    </main>
  </div>
  
  <footer class="bg-dark text-white text-center py-3 mt-5"> <!-- mt-5 클래스를 추가하여 상단에 빈공간 추가 -->
    <div class="container">
      <div class="row">
        <div class="col">
          <a href="#" class="text-white me-2">Pshelter</a>
          <a href="#" class="text-white me-2">이용 약관</a>
          <a href="#" class="text-white me-2">Shipping Information</a>
          <a href="#" class="text-white me-2">Privacy Policy</a>
          <a href="#" class="text-white">Blog</a>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <p>&copy; 2024 Pshelter. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #121212;
  color: #ffffff;
}
.container {
  max-width: 1200px;
}
footer {
  margin-top: 5rem; /* 빈 공간 추가 */
}
</style>
