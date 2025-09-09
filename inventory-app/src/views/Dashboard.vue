<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in productStore.products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="rounded-lg elevation-2">
          <!-- Product Image -->
          <v-img
            :src="product.images[0]"
            height="200"
            cover
            class="rounded-t-lg"
          ></v-img>

          <!-- Card Content -->
          <v-card-title class="text-h6">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="text-caption">
            ₹ {{ product.price }}
          </v-card-subtitle>

          <v-card-text>
            {{ product.description }}
          </v-card-text>

          <!-- Actions -->
          <v-card-actions>
            <v-btn color="primary" variant="flat">View</v-btn>
            <v-btn color="success" @click="addToCart(product);" variant="flat">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../stores/products.js";

const productStore = useProductStore();
function addToCart(row) {
    productStore.addToCartProduct(row);
}
onMounted(() => {
  productStore.fetchProducts();
});
</script>
