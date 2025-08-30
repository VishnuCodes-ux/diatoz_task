import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      { name: 'Laptop', price: 55000, quantity: 5 },
      { name: 'Mouse', price: 500, quantity: 20 },
      { name: 'Keyboard', price: 1500, quantity: 10 },
      { name: 'Monitor', price: 12000, quantity: 3 },
    ]
  }),
  actions: {
    addProduct(product) {
      this.products.push(product)
    }
  }
})
