<template>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainSlider />
        <ProductsGrid :products="products" class="mt-8" />
    </main>
</template>

<script setup>
const {data: products} = await useFetch('/api/products', {
    key: 'catalog-products',
    getCachedData(key) {
        const nuxtApp = useNuxtApp();
        return nuxtApp.payload.data[key] || null;
    }
})

const MainSlider = defineAsyncComponent(() => import('/components/MainSlider.vue'));
const ProductsGrid = defineAsyncComponent(() => import('/components/ProductsGrid.vue'));
</script>

<style lang="scss" scoped>

</style>