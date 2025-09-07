<template>
<Card>
    <template #content>
        <div class="relative grid grid-cols-2 grid-rows-3 md:grid-cols-[repeat(15,1fr)] md:grid-rows-1 items-center gap-4 w-full">
            <slot></slot>
            <div class="flex gap-4 col-span-2 row-span-2 md:col-span-6">
                <NuxtImg :src="props.product.image" :alt="props.product.title"
                         class="shrink-0 object-cover rounded-lg h-[96px] w-[128px]" />
                <div class="flex flex-col">
                    <span class="font-semibold text-lg">{{ props.product.title }}</span>
                    <span class="text-gray-600">Price: {{ props.product.price }} MDL</span>
                    <span class="text-gray-600">Stock: {{ props.product.stock }}</span>
                </div>
            </div>
            <InputNumber v-if="cartProduct" v-model="cartProduct.qty" inputId="minmax" class="col-span-2 md:col-span-4"
                         :min="1" :max="props.product.stock || 1" :step="1" :disabled="props.product.stock === 0"
                         showButtons buttonLayout="horizontal" fluid @update:modelValue="cardProductOnChange">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus"/>
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus"/>
                </template>
            </InputNumber>
            <div class="flex-1 text-start md:text-center font-semibold text-lg md:col-span-3">
                {{ productFinalPrice }} MDL
            </div>
            <Button icon="pi pi-trash" class="p-button-danger p-button-text justify-self-end" @click="() => emit('deleted', props.product)"/>
        </div>
    </template>
</Card>
</template>

<script setup>
import {Card, InputNumber} from "primevue";
import {useShopCart} from "~/composables/useShopCart.js";

const props = defineProps({
    product: {
        type: Object,
        required: true,
        validator: (p) => 'id' in p && 'title' in p && 'price' in p && 'stock' in p
    }
})

const emit = defineEmits(['deleted']);

const {
    cartProduct,
    cardProductOnChange,
    productFinalPrice,
} = useShopCart(toRef(props, 'product'));
</script>

<style lang="scss" scoped>

</style>