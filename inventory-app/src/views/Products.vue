<template>
    <v-container fluid>
        <v-card class="mb-6 elevation-2">
            <v-card-title class="d-flex align-center justify-space-between bg-primary text-white">
                <span class="text-h6">📦 Inventory Management System</span>
                <div>
                    <v-btn color="white" variant="outlined" rounded class="mr-2" prepend-icon="mdi-plus"
                        @click="toggleForm">
                        {{ showForm ? 'Close' : 'Add Product' }}
                    </v-btn>
                    <v-btn color="error" variant="flat" rounded prepend-icon="mdi-logout" @click="logout">
                        Logout
                    </v-btn>
                </div>
            </v-card-title>
        </v-card>

        <v-card class="elevation-2">
            <v-card-text>
                <v-text-field v-model="search" label="Search products..." prepend-inner-icon="mdi-magnify" clearable
                    density="comfortable" variant="outlined" class="mb-4" />
                <v-data-table :headers="headers" :items="productStore.products" fixed-header
                    :sort-by="[{ key: 'name', order: 'asc' }]" sort-asc :search="search" :items-per-page="5"
                    class="elevation-1 rounded-lg" density="comfortable">
                    <template v-slot:no-data>
                        <v-alert type="info" border="start" color="blue-lighten-4">
                            No products found.
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <template v-if="showForm">
            <AddProductForm @saved="showForm = false" @cancel="showForm = false" />
        </template>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useProductStore } from "../stores/products";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import AddProductForm from "../components/AddProductForm.vue";

const router = useRouter();
const productStore = useProductStore();
const authStore = useAuthStore();

const search = ref("");
const showForm = ref(false);

const headers = [
    { title: "Name", key: "name", sortable: true },
    { title: "Price", key: "price", sortable: true },
    { title: "Quantity", key: "quantity", sortable: true },
];

function toggleForm() {
    showForm.value = !showForm.value;
}

function logout() {
    authStore.logout();
    router.push("/login");
}
</script>
