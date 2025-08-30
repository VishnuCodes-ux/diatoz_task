<template>
  <v-container class="d-flex justify-center align-center" style="height:100vh">
    <v-card class="pa-6" width="400">
      <v-card-title>Login</v-card-title>
      <v-form @submit.prevent="handleLogin">
        <v-text-field v-model="username" label="Username" required></v-text-field>
        <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
        <v-btn type="submit" color="primary" block>Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

function handleLogin() {
  if (authStore.login(username.value, password.value)) {
    router.push('/products')
  } else {
    alert('Invalid Credentials')
  }
}
</script>
