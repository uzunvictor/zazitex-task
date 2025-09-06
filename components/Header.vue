<template>
<header class="sticky top-0 z-50 h-20 flex items-center justify-center bg-white shadow px-4">
    <nav class="max-w-7xl w-full flex justify-between gap-4">
        <div class="flex gap-4 items-center">
            <NuxtLink to="/" class="flex items-center">
                <NuxtImg src="/logo.svg" height="60" width="120" alt="Logo" loading="lazy"/>
            </NuxtLink>
            <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="text-gray-500 hover:text-green-700"
            >{{ l.label }}
            </NuxtLink>
        </div>
        <NuxtLink to="/shop-cart" class="flex items-center mr-4">
            <ClientOnly>
                <OverlayBadge :value="cartSize" severity="danger" size="small">
                    <NuxtImg src="/cart.svg" height="30" width="30"/>
                </OverlayBadge>
            </ClientOnly>
        </NuxtLink>
    </nav>
</header>
</template>

<script setup>
import OverlayBadge from 'primevue/overlaybadge';
import {useShopCart} from "/composables/useShopCart.js";

const {cartSize} = useShopCart();

const links = ref([
    {
        label: 'Catalog',
        to: 'catalog'
    },
    {
        label: 'Blog',
        to: 'blog'
    },
    {
        label: 'Contacts',
        to: 'contacts',
    }
]);
</script>

<style lang="scss" scoped>

</style>