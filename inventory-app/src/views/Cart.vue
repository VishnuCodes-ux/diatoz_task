<template>
    <v-container class="py-6">
        <h2 class="text-h5 mb-4">🛒 My Cart</h2>

        <div v-if="cartItems.length === 0" class="text-center py-10">
            <v-icon size="48" color="grey">mdi-cart-off</v-icon>
            <p class="mt-2 text-grey">Your cart is empty</p>
        </div>

        <v-row v-else>
            <v-col v-for="item in cartItems" :key="item.id" cols="12" sm="6" md="4">
                <v-card class="pa-3 rounded-lg elevation-2">
                    <v-img :src="item.images[0]" height="180" class="rounded mb-2" cover />

                    <div class="d-flex justify-space-between align-center">
                        <h3 class="text-subtitle-1">{{ item.title }}</h3>
                        <span class="font-bold">₹ {{ item.price }}</span>
                    </div>

                    <p class="text-caption text-grey mt-1">
                        {{ item.description }}
                    </p>

                    <div class="d-flex align-center mt-3">
                        <v-btn icon="mdi-minus" size="small" @click="decreaseQty(item.id)" :disabled="item.qty <= 1" />
                        <span class="mx-3 font-bold">{{ item.qty }}</span>
                        <v-btn icon="mdi-plus" size="small" @click="increaseQty(item.id)" />
                    </div>

                    <v-btn color="red" variant="tonal" block class="mt-3" @click="removeItem(item.id)">
                        Remove
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>

        <v-card v-if="cartItems.length > 0" class="pa-4 mt-6 rounded-lg elevation-3">
            <div class="d-flex justify-space-between align-center">
                <span class="text-h6">Total</span>
                <span class="text-h6 font-bold">₹ {{ totalPrice }}</span>
            </div>
            <v-btn color="green" block class="mt-4" @click="checkout">
                Checkout
            </v-btn>
        </v-card>
    </v-container>
</template>

<script setup>
import { computed } from "vue"
import { useProductStore } from "../stores/products.js"

const productStore = useProductStore()

const cartItems = computed(() => productStore.getCartItems)

const totalPrice = computed(() => productStore.getCartTotal)

const increaseQty = (id) => productStore.increaseQty(id)
const decreaseQty = (id) => productStore.decreaseQty(id)
const removeItem = (id) => productStore.removeFromCart(id)

const checkout = () => {
    console.log("Proceeding to checkout...", cartItems.value)
}
</script>
