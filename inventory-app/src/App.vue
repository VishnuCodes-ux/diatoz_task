<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My Inventory</v-toolbar-title>
      <v-spacer></v-spacer>
       <v-badge
        :content="productStore.addToCartProductCount"
        color="red"
        overlap
      >
      <router-link to="/cart">
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </router-link>
      </v-badge>
      <v-btn text to="/products">Products</v-btn>
      <v-btn text to="/login">Login</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="primary" dark>
      <v-col class="text-center">
        © {{ new Date().getFullYear() }} My Shop. All Rights Reserved.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useProductStore } from '../src/stores/products'
const productStore = useProductStore();

</script>

<style>
body {
  margin: 0;
  font-family: Roboto, sans-serif;
}
</style>
