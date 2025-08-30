<template>
  <v-app>
    <v-app-bar v-if="authStore.isAuthenticated" app color="primary" dark>
      <v-toolbar-title>My Inventory</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/products">Products</v-btn>
      <v-btn text to="/login">Login</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer v-if="authStore.isAuthenticated" app color="primary" dark>
      <v-col class="text-center">
        © {{ new Date().getFullYear() }} My Shop. All Rights Reserved.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { useAuthStore } from '../src/stores/auth'
const authStore = useAuthStore()
</script>

<style>
body {
  margin: 0;
  font-family: Roboto, sans-serif;
}
</style>
