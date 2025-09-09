<template>
  <v-container fluid>
    <!-- Header -->
    <v-card class="mb-6 elevation-2">
      <v-card-title
        class="d-flex align-center justify-space-between bg-primary text-white"
      >
        <span class="text-h6">📦 Inventory Management System</span>
        <div>
          <v-btn
            color="white"
            variant="outlined"
            rounded
            class="mr-2"
            prepend-icon="mdi-plus"
            @click="toggleForm"
          >
            {{ showForm ? "Close" : "Add Product" }}
          </v-btn>
          <v-btn
            color="error"
            variant="flat"
            rounded
            prepend-icon="mdi-logout"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </v-card-title>
    </v-card>

    <!-- Data Table -->
    <v-card class="elevation-2">
      <v-card-text>
        <!-- Search -->
        <v-text-field
          v-model="search"
          label="Search products..."
          prepend-inner-icon="mdi-magnify"
          clearable
          density="comfortable"
          variant="outlined"
          class="mb-4"
        />

        <v-data-table
          :headers="headers"
          :items="productStore.getProducts"
          :search="search"
          class="elevation-1"
        >
          <!-- Images column -->
          <template #item.images="{ item }">
            <div class="d-flex flex-row">
              <v-img
                v-for="(img, i) in item.images"
                :key="i"
                :src="img"
                width="60"
                height="60"
                class="mr-2 rounded"
                cover
              />
            </div>
          </template>

          <!-- Category column -->
          <template #item.category="{ item }">
            {{ item.category?.name }}
          </template>

          <!-- No data -->
          <template #no-data>
            <v-alert type="info" border="start" color="blue-lighten-4">
              No products found.
            </v-alert>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- Add Product Form -->
    <template v-if="showForm">
      <AddProductForm @saved="showForm = false" @cancel="showForm = false" />
    </template>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../stores/products";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import AddProductForm from "../components/AddProductForm.vue";

const router = useRouter();
const productStore = useProductStore();
const authStore = useAuthStore();

// const products = ref([]);
const search = ref("");
const showForm = ref(false);

const headers = [
  { title: "ID", key: "id" },
  { title: "Title", key: "title" },
  { title: "Slug", key: "slug" },
  { title: "Price", key: "price" },
  { title: "Description", key: "description" },
  { title: "Category", key: "category" },
  { title: "Images", key: "images" },
  { title: "Created At", key: "creationAt" },
  { title: "Updated At", key: "updatedAt" },
];

function toggleForm() {
  showForm.value = !showForm.value;
}

function logout() {
  authStore.logout();
  router.push("/login");
}

onMounted(() => {
    productStore.fetchProducts();
});
</script>
