<template>
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Fresh Food Products</h1>
        <p class="text-gray-600">Discover our wide range of premium quality food products</p>
    </div>
    <ProductsGrid :products="products"/>
</main>
</template>

<script setup>
import { useSeoMeta } from '#app'

useSeoMeta({
    title: 'Line Food Market - Catalog',
    description: 'Browse fresh groceries and gourmet products at Line Food Market.',
    ogTitle: 'Line Food Market - Catalog',
    ogDescription: 'Browse fresh groceries and gourmet products at Line Food Market.',
    ogImage: 'https://line.com/images/og-catalog.jpg'
});

const {data: products} = await useFetch('/api/products', {
    key: 'catalog-products',
    getCachedData(key) {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || null;
    }
})

const ProductsGrid = defineAsyncComponent(() => import('/components/ProductsGrid.vue'))
</script>

<style lang="scss" scoped>

</style>