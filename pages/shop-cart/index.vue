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
                <ShopCartProductCard v-for="product in products" :key="product.id"
                                     :product="product"
                                     v-model="orderProductsIds"
                                     @deleted="setProductForDelete">
                    <Checkbox v-model="orderProductsIds" :value="product.id" class="md:!hidden absolute top-0 right-0"/>
                    <Checkbox v-model="orderProductsIds" :value="product.id" class="max-md:!hidden"/>
                </ShopCartProductCard>
            </TransitionGroup>
            <Transition
                enter-active-class="transition transform duration-500 ease-out"
                enter-from-class="opacity-0 translate-y-8"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition transform duration-500 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-8">
                <div v-if="totalBlockIsVisible">
                    <Card class="sticky top-20"
                          :pt="{body: {class: 'h-full'}, content: {class: 'h-full'}}">
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
                                <Button label="Proceed to Checkout" class="w-full"
                                        v-tooltip.top="!orderProductsIds.length ? 'Select products to proceed' : ''"
                                        :disabled="!orderProductsIds.length"
                                        @click="showOrderSection"/>
                            </div>
                        </template>
                    </Card>
                </div>
            </Transition>
        </div>
        <div v-show="orderSectionIsVisible && totalItems > 0" ref="orderSection" class="mt-4">
            <Card v-show="orderSectionIsVisible" ref="orderSection">
                <template #title>Order Details</template>
                <template #content>
                    <div class="flex flex-col gap-4">
                        <div class="">
                            <div v-for="p in orderProductsList" :key="p.id" class="grid grid-cols-2">
                                <span>{{ p.title }} (x{{ p.qty }})</span>
                                <span class="text-end">{{ (p.price * p.qty).toFixed(2) }} MDL</span>
                            </div>
                        </div>
                        <div class="flex flex-wrap justify-between text-lg font-semibold">
                            <span>Subtotal:</span>
                            <span>{{ totalPrice }} MDL</span>
                        </div>
                        <Button label="Place Order" class="w-full"
                                :disabled="!orderProductsIds.length || ordersAreExecuting"
                                :loading="ordersAreExecuting" @click="orderExecute"/>
                    </div>
                </template>
            </Card>
        </div>
        <Dialog v-model:visible="deleteModalIsVisible" modal header="Deleting product" :style="{ width: '50vw' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
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

const {cart, cartProductsIds, cartProductsUniqueKey, deleteFromCart} = useShopCart()

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
const {data: orders, execute: orderExecute, pending: ordersAreExecuting} = useFetch('/api/orders', {
    key: 'orders',
    getCachedData(key) {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || null;
    },
    immediate: false,
    lazy: true,
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
    deleteFromCart(id);
    products.value = products.value.filter(p => p.id !== id);
    deleteModalClose();
}

const orderProductsIds = ref([]);
const orderProductsList = computed(() =>
    products.value.filter(p => orderProductsIds.value.includes(p.id)).map(p => ({
        ...p,
        qty: cart.value.get(p.id)?.qty || 1
    }))
);
const orderSectionEl = useTemplateRef('orderSection')
const orderSectionIsVisible = ref(false);
const showOrderSection = () => {
    orderSectionIsVisible.value = true;
    nextTick(() => {
        orderSectionEl.value.scrollIntoView({behavior: 'smooth'});
    })
}

const totalBlockIsVisible = ref(false);
const totalItems = computed(() =>
    orderProductsIds.value.reduce((sum, id) => {
        const p = cart.value.get(id)
        return sum + (p ? p.qty : 0)
    }, 0)
);
const totalPrice = computed(() =>
    orderProductsList.value.reduce((sum, item) => sum + (item.price * item.qty), 0)?.toFixed(2)
);

onMounted(() => {
    setTimeout(() => {
        totalBlockIsVisible.value = true;
    }, 300)
})

const ShopCartProductCard = defineAsyncComponent(() => import('/components/ShopCartProductCard.vue'));
</script>

<style lang="scss" scoped>

</style>