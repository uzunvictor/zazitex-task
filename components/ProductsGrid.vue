<template>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <ProductCard v-for="product in products" :key="product.id"
                 :product="product"/>
</div>
</template>

<script setup>
defineProps({
    products: {
        type: Array,
        required: true
    }
})

const ProductCard = defineAsyncComponent(() => import('/components/ProductCard.vue'))
</script>

<style lang="scss" scoped>

</style>