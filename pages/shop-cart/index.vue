<template>
<main class="max-w-7xl min-h-screen mx-auto px-4 md:px-6 py-8 relative">
    <ClientOnly>
        <Transition>
            <div v-if="productsAreLoading"
                 class="fixed top-20 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
                <ProgressSpinner/>
            </div>
        </Transition>

        <h1 class="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

        <div v-if="!orderSuccessModalIsVisible && products?.length" class="w-full h-full">
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
                                         v-tooltip.top="product.stock === 0 ? 'Out of stock' : ''"
                                         :product="product"
                                         v-model="orderProductsIds"
                                         @deleted="setProductForDelete">
                        <Checkbox v-model="orderProductsIds" :value="product.id" :disabled="product.stock === 0"
                                  class="md:!hidden absolute top-0 right-0"/>
                        <Checkbox v-model="orderProductsIds" :value="product.id" :disabled="product.stock === 0"
                                  class="max-md:!hidden"/>
                    </ShopCartProductCard>
                </TransitionGroup>
                <Transition
                    enter-active-class="transition transform duration-500 ease-out"
                    enter-from-class="opacity-0 translate-y-8"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition transform duration-500 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-8">
                    <div v-if="totalBlockIsVisible" class="flex flex-col gap-4 sticky top-20 max-h-64">
                        <Card :pt="{body: {class: 'h-full'}, content: {class: 'h-full'}}">
                            <template #content>
                                <div class="flex flex-col gap-2 h-full">
                                    <div class="flex flex-wrap justify-between text-lg font-semibold">
                                        <span>Products in cart:</span>
                                        <span>{{ cartSize }}</span>
                                    </div>
                                    <div class="flex flex-wrap justify-between text-lg font-semibold">
                                        <span>Selected products:</span>
                                        <span>{{ orderProductsList.length }}</span>
                                    </div>
                                    <div class="flex flex-wrap justify-between text-lg font-semibold">
                                        <span>Subtotal:</span>
                                        <span>{{ totalPrice }} MDL</span>
                                    </div>
                                    <Button label="Proceed to Checkout" class="w-full" severity="secondary"
                                            v-tooltip.top="!orderProductsIds.length ? 'Select products to proceed' : ''"
                                            :disabled="!orderProductsIds.length"
                                            @click="toOrderSection"/>
                                </div>
                            </template>
                        </Card>
                    </div>
                </Transition>
            </div>
            <div ref="orderSection" id="orderSection" class="mt-4">
                <Transition name="slide-down">
                    <Card v-if="orderSectionIsVisible && totalItems > 0">
                        <template #title>Order Details</template>
                        <template #content>
                            <div class="flex flex-col gap-4">
                                <div v-for="p in orderProductsList" :key="p.id" class="grid grid-cols-2">
                                    <span>{{ p.title }} (x{{ p.qty }})</span>
                                    <span class="text-end">{{ (p.price * p.qty).toFixed(2) }} MDL</span>
                                </div>
                                <div class="flex flex-wrap justify-between text-lg font-semibold">
                                    <span>Subtotal:</span>
                                    <span>{{ totalPrice }} MDL</span>
                                </div>
                                <Button label="Place Order" class="w-full"
                                        :disabled="!orderProductsIds.length || orderIsExecuting"
                                        :loading="orderIsExecuting" @click="orderExecute"/>
                            </div>
                        </template>
                    </Card>
                </Transition>
            </div>
        </div>

        <div v-else-if="!orderSuccessModalIsVisible && !products?.length && !productsAreLoading"
             class="w-full h-full">
            <div class="flex justify-between">
                    <span
                        class="text-lg font-semibold">Your shopping cart is empty. Pick some products to proceed.</span>
                <NuxtLink to="/catalog">
                    <Button label="Catalog" severity="success"/>
                </NuxtLink>
            </div>
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
        <Dialog v-model:visible="orderSuccessModalIsVisible" modal :style="{ width: '50vw' }"
                :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #container>
                <div class="p-4">
                    <h2 class="text-xl mb-4">Your order has been successfully processed.</h2>
                    <div class="flex justify-end gap-2">
                        {{ order }}
                    </div>
                    <div class="flex justify-end gap-2">
                        <NuxtLink to="/catalog">
                            <Button label="Continue Shopping" severity="success"/>
                        </NuxtLink>
                    </div>
                </div>
            </template>
        </Dialog>
    </ClientOnly>
</main>
</template>

<script setup>
import {useShopCart} from "/composables/useShopCart.js";
import {Button, Card, Checkbox, ProgressSpinner} from "primevue";
import {useToast} from "primevue/usetoast";

definePageMeta({
    pageTransition: false
})

const toast = useToast();
const {cart, cartProductsIds, cartProductsUniqueKey, cartSize, clearCart, deleteFromCart} = useShopCart()

const {data: products, status: productsStatus} = await useFetch('/api/products', {
    key: cartProductsUniqueKey.value,
    getCachedData(key) {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || null;
    },
    query: {
        ids: [...cartProductsIds.value]
    },
    server: false,
    immediate: !!cartSize.value,
})

const productsAreLoading = computed(() => productsStatus.value === 'pending');
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
    products.value?.filter(p => orderProductsIds.value.includes(p.id) && p.stock > 0).map(p => ({
        ...p,
        qty: cart.value.get(p.id)?.qty || 1
    })) || []
);

const orderSectionEl = useTemplateRef('orderSection')
const orderSectionIsVisible = ref(false);
const toOrderSection = () => {
    orderSectionIsVisible.value = true;
    nextTick(() => {
        orderSectionEl.value.scrollIntoView({behavior: 'smooth'});
    })
}

const {data: order, execute: executeOrder, status: orderStatus} = await useLazyFetch('/api/orders', {
    method: 'POST',
    watch: false,
    immediate: false,
    body: {
        products: computed(() => orderProductsList.value.map(p => ({id: p.id, qty: p.qty})))
    },
    server: false,
})

const orderSuccessModalIsVisible = ref(false);
const orderIsExecuting = computed(() => orderStatus.value === 'pending');

const orderExecute = async () => {
    if (!orderProductsIds.value.length) return;
    try {
        await executeOrder();
        orderSuccessModalIsVisible.value = true;
        clearCart();
        orderProductsIds.value = [];
    } catch (e) {
        console.error('orderExecute error: ', e);
        toast.add({severity: 'error', summary: 'Error', detail: e, life: 3000});
    }
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
#orderSection {
    scroll-margin-top: 50vh;
}
</style>