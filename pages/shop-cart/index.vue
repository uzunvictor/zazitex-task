<template>
<ClientOnly>
    <div class="p-4 md:p-8 max-w-5xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TransitionGroup
                tag="div"
                class="grid gap-4 md:col-span-3"
                enter-active-class="transition transform duration-500 ease-out"
                enter-from-class="opacity-0 translate-x-8"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="transition transform duration-500 ease-in"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-8">
                <ShopCartProductCard v-for="product in products" :key="product.id" :product="product"
                                     @deleted="setProductForDelete"/>
            </TransitionGroup>
            <Card class="max-h-40 sticky top-20" :pt="{
                body: {class: 'h-full'}, content: {class: 'h-full' }
            }">
                <template #content>
                    <div class="flex flex-col gap-2 h-full">
                        <div class="flex flex-wrap justify-between text-lg font-semibold">
                            <span>Total items:</span>
                            <span>{{ totalItems }}</span>
                        </div>
                        <div class="flex flex-wrap justify-between text-lg font-semibold">
                            <span>Subtotal:</span>
                            <span>{{ totalPrice }} MDL</span>
                        </div>
                        <Button label="Proceed to Checkout" class="w-full" @click="() => orderSectionIsVisible = true"/>
                    </div>
                </template>
            </Card>
        </div>
        <Dialog v-model:visible="deleteModalIsVisible" modal header="Deleting product" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="p-4">
                <h2 class="text-xl mb-4">Are you sure you want to remove this product from the cart?</h2>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" severity="secondary" @click="deleteModalClose"/>
                    <Button label="Delete" severity="danger" @click="deleteProduct"/>
                </div>
            </div>
        </Dialog>
        <Dialog v-model:visible="orderSectionIsVisible" modal header="Order" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="p-4">
                <h2 class="text-xl mb-4">Are you sure you want to remove this product from the cart?</h2>
                <div class="flex justify-end gap-2">
                    <Button label="Cancel" severity="secondary" @click="deleteModalClose"/>
                    <Button label="Delete" severity="danger" @click="deleteProduct"/>
                </div>
            </div>
        </Dialog>
    </div>
</ClientOnly>
</template>

<script setup>
import {useShopCart} from "/composables/useShopCart.js";
import {Button, Card} from "primevue";

definePageMeta({
    pageTransition: false
})

const {cartProductsIds, cartProductsUniqueKey, deleteFromCart, totalItems, totalPrice} = useShopCart()

const {data: products} = await useFetch('/api/products', {
    key: cartProductsUniqueKey.value,
    getCachedData(key) {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || null;
    },
    query: {
        ids: cartProductsIds.value
    },
    server: false
})

const productForDelete = ref(null);

const deleteModalIsVisible = ref(false);
const deleteModalClose = () => {
    productForDelete.value = null;
    deleteModalIsVisible.value = false;
}

const setProductForDelete = (product) => {
    productForDelete.value = product;
    deleteModalIsVisible.value = true;
}

const deleteProduct = () => {
    const id = productForDelete.value.id;
    console.log('deleting product', id);
    deleteFromCart(id);
    products.value = products.value.filter(p => p.id !== id);
    deleteModalClose();
}

const orderSectionIsVisible = ref(false);

const ShopCartProductCard = defineAsyncComponent(() => import('/components/ShopCartProductCard.vue'));
</script>

<style lang="scss" scoped>

</style>