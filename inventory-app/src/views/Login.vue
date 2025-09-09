<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-6" width="400">
      <v-card-title>Login</v-card-title>
      <v-form ref="formRef" @submit.prevent="handleLogin">
        <v-text-field v-model.trim="email" label="Email" :rules="[required, minLength(3)]"></v-text-field>

        <v-text-field v-model="password" type="password" label="Password"
          :rules="[required, minLength(6)]"></v-text-field>

        <v-btn type="submit" color="primary" block>Login</v-btn>
      </v-form>
    </v-card>
    <v-snackbar v-model="showError" color="error" timeout="3000" location="top">
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import api from '../api.js';

const errorMessage = ref("");
const showError = ref(false);

const email = ref("");
const password = ref("");
const formRef = ref(null);

const authStore = useAuthStore();
const router = useRouter();

const required = (v) =>
  (v !== null && v !== undefined && v !== "") || "Required";
const minLength = (len) => (v) =>
  (v && v.length >= len) || `Min ${len} characters`;

async function getProfile() {
  try {
    const response = await api.get("auth/profile");
    authStore.user = response.data;
  } catch (error) {
    console.log('error', error);
  }
}

async function handleLogin() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  const result = await authStore.login(email.value, password.value);

  if (result.success) {
    await getProfile();
    router.push("/dashboard");
  } else {
    errorMessage.value = result.message;
    showError.value = true;
  }
}
</script>
