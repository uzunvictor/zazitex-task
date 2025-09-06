<template>
<div class="w-full h-[42px]">
    <ClientOnly>
        <div v-if="cartProduct" class="w-full">
            <InputNumber v-model="cartProduct.qty" inputId="minmax" :min="1" :max="props.product.stock || 1" :step="1"
                         showButtons buttonLayout="horizontal" fluid>
                <template #incrementbuttonicon>
                    <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus"/>
                </template>
            </InputNumber>
        </div>
        <Button v-else label="Add to Cart" icon="pi pi-shopping-cart" class="w-full" @click="addToCart"/>
    </ClientOnly>
</div>
</template>

<script setup>
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import {useShopCart} from "/composables/useShopCart";

const props = defineProps({
    product: {
        type: Object,
        required: true,
        validator: (p) => 'id' in p && 'title' in p && 'price' in p && 'stock' in p
    }
})

const {
    addToCart,
    cartProduct,
} = useShopCart(toRef(props, 'product'));
</script>

<style lang="scss" scoped>

</style>