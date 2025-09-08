<template>
<main class="max-w-7xl min-h-screen mx-auto px-4 md:px-6 py-8 relative">
<!--    <MainSlider/>-->
<!--    <ProductsGrid :products="products" class="mt-8"/>-->
</main>
</template>

<script setup>
import {useHead, useSeoMeta} from "#app";

useSeoMeta({
    title: 'Line Food Market - Best Food Market!',
    description: 'Browse fresh groceries and gourmet products at Line Food Market.',
    ogTitle: 'Line Food Market - Best Food Market!',
    ogDescription: 'Browse fresh groceries and gourmet products at Line Food Market.',
    ogImage: 'https://line.com/images/og-catalog.jpg'
});

useHead({
    link: [
        {rel: 'canonical', href: 'https://line.com'},
    ]
});

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