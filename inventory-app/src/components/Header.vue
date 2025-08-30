<template>
  <header class="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">My Shop</h1>
    <nav>
      <router-link to="/products" class="px-3">Products</router-link>
      <router-link to="/login" class="px-3">Login</router-link>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
a.router-link-active {
  font-weight: bold;
  border-bottom: 2px solid white;
}
</style>
