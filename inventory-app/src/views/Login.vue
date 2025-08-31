<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-card class="pa-6" width="400">
      <v-card-title>Login</v-card-title>
      <v-form ref="formRef" @submit.prevent="handleLogin">
        <v-text-field v-model.trim="username" label="Username" :rules="[required, minLength(3)]"></v-text-field>

        <v-text-field v-model="password" type="password" label="Password"
          :rules="[required, minLength(6)]"></v-text-field>

        <v-btn type="submit" color="primary" block>Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const formRef = ref(null);

const authStore = useAuthStore();
const router = useRouter();

const required = (v) =>
  (v !== null && v !== undefined && v !== "") || "Required";
const minLength = (len) => (v) =>
  (v && v.length >= len) || `Min ${len} characters`;

async function handleLogin() {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  if (authStore.login(username.value, password.value)) {
    router.push("/products");
  } else {
    alert("Invalid Credentials");
  }
}
</script>
