import { defineStore } from 'pinia'
import api from "../api.js"

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    addToCart: [] // will hold {id, title, price, qty, images...}
  }),

  getters: {
    getProducts: (state) => state.products,
    getCartItems: (state) => state.addToCart,
    addToCartProductCount: (state) =>
      state.addToCart.reduce((sum, item) => sum + item.qty, 0),
    getCartTotal: (state) =>
      state.addToCart.reduce((sum, item) => sum + item.price * item.qty, 0)
  },

  actions: {
    // Add to cart with qty check
    addToCartProduct(product) {
      const existing = this.addToCart.find((p) => p.id === product.id)
      if (existing) {
        existing.qty++
      } else {
        this.addToCart.push({ ...product, qty: 1 })
      }
    },

    // Qty controls
    increaseQty(id) {
      const item = this.addToCart.find((p) => p.id === id)
      if (item) item.qty++
    },

    decreaseQty(id) {
      const item = this.addToCart.find((p) => p.id === id)
      if (item && item.qty > 1) {
        item.qty--
      } else {
        this.removeFromCart(id)
      }
    },

    // Remove item
    removeFromCart(id) {
      this.addToCart = this.addToCart.filter((p) => p.id !== id)
    },

    // Fetch products from API
    async fetchProducts() {
      try {
        const response = await api.get("/products")
        this.products = response.data
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }
  }
})
