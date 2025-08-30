import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      { name: 'Laptop', price: 55000, quantity: 5 },
      { name: 'Mouse', price: 500, quantity: 20 },
      { name: 'Keyboard', price: 1500, quantity: 10 },
      { name: 'Monitor', price: 12000, quantity: 3 },
      { name: 'Printer', price: 8000, quantity: 4 },
      { name: 'External Hard Drive', price: 6000, quantity: 8 },
      { name: 'Smartphone', price: 30000, quantity: 7 },
      { name: 'Tablet', price: 20000, quantity: 6 },
      { name: 'Webcam', price: 2500, quantity: 15 },
      { name: 'Headphones', price: 3500, quantity: 12 }
    ]
  }),
  actions: {
    addProduct(product) {
      this.products.push(product)
    }
  }
})
