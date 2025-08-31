<template>
    <v-dialog v-model="dialog"  @click:outside="closeDialog" transition="dialog-bottom-transition" max-width="700" persistent>
        <v-card class="pa-4 rounded-t-xl">
            <v-card-title class="text-h6">
                Add Product
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" variant="text" @click="closeDialog"></v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-form ref="formRef" @submit.prevent="handleSubmit">
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field v-model.trim="name" label="Product Name" :rules="[required, notNumber]" />
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field v-model.number="price" label="Price" type="number" inputmode="decimal"
                                min="0.01" step="0.01" :rules="[required, positivePrice]" />
                        </v-col>

                        <v-col cols="12" sm="4">
                            <v-text-field v-model.number="quantity" label="Quantity" type="number" inputmode="numeric"
                                min="0" step="1" :rules="[required, nonNegative, integerOnly]" />
                        </v-col>
                    </v-row>

                    <div class="d-flex justify-end mt-6">
                        <v-btn class="mr-2" color="secondary" @click="closeDialog">Cancel</v-btn>
                        <v-btn type="submit" color="primary">Save Product</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useProductStore } from '../stores/products'

const dialog = ref(true)
const formRef = ref(null)

const name = ref('')
const price = ref(null)
const quantity = ref(null)

const productStore = useProductStore()
const emit = defineEmits(['saved', 'cancel'])

const required = v => (v !== null && v !== undefined && v !== '') || 'Required'
const positivePrice = v => Number(v) > 0 || 'Enter valid price'
const nonNegative = v => Number(v) >= 0 || 'Enter valid qty'
const integerOnly = v => Number.isInteger(Number(v)) || 'Must be an integer'
const notNumber = v => isNaN(Number(v)) || 'Numbers are not allowed';



async function handleSubmit() {
    const { valid } = await formRef.value.validate()
    if (!valid) return

    productStore.addProduct({
        name: name.value,
        price: Number(price.value),
        quantity: Number(quantity.value),
    })

    name.value = ''
    price.value = null
    quantity.value = null
    formRef.value.resetValidation()

    dialog.value = false
    emit('saved')
}

function closeDialog() {
    dialog.value = false
    emit('cancel')
}
</script>

<style>
.v-dialog__content {
    align-items: flex-end !important;
}
</style>
