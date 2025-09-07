<template>
<header class="sticky top-0 z-50 h-20 flex items-center justify-between bg-white shadow px-4 md:px-8">
    <Button icon="pi pi-bars" variant="link" class="p-button-text md:!hidden" @click="visible = true"/>
    <nav class="max-w-7xl w-full flex gap-4 max-md:!hidden">
        <div class="flex gap-4 items-center">
            <NuxtLink to="/" class="flex items-center">
                <NuxtImg src="/logo.svg" height="60" width="120" alt="Logo" loading="lazy"/>
            </NuxtLink>
            <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="text-gray-500 hover:text-green-700"
            >{{ l.label }}
            </NuxtLink>
        </div>
    </nav>
    <NuxtImg src="/logo.svg" height="60" width="120" alt="Logo" loading="lazy" class="md:hidden"/>
    <div class="flex items-center gap-4 min-w-10 md:min-w-[182px]">
        <RefreshApp class="max-md:!hidden min-w-[120px]"/>
        <NuxtLink to="/shop-cart" class="flex items-center mr-4">
            <ClientOnly>
                <OverlayBadge v-if="cartSize" :value="cartSize" severity="danger" size="small" class="h-8 w-8 shrink-0">
                    <NuxtImg src="/cart.svg" height="32" width="32" />
                </OverlayBadge>
                <NuxtImg v-else src="/cart.svg" height="32" width="32" class="shrink-0"/>
            </ClientOnly>
        </NuxtLink>
    </div>

    <Drawer v-model:visible="visible">
        <template #container="{ closeCallback }">
            <div class="flex flex-col h-full">
                <NuxtImg src="/logo.svg" height="60" width="120" alt="Logo" loading="lazy" class="m-4"/>
                <nav class="flex flex-col gap-4 p-8">
                    <NuxtLink v-for="l in links" :key="l.label" :to="l.to" class="text-gray-500 hover:text-green-700"
                              @click="closeCallback()"
                    >{{ l.label }}
                    </NuxtLink>
                </nav>
                <RefreshApp class="ml-8 min-w-[120px]"/>
            </div>
        </template>
    </Drawer>
</header>
</template>

<script setup>
import OverlayBadge from 'primevue/overlaybadge';
import {useShopCart} from "/composables/useShopCart.js";
import Drawer from 'primevue/drawer';

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

const visible = ref(false);

const RefreshApp = defineAsyncComponent(() => import('/components/RefreshApp.vue'));
</script>

<style lang="scss" scoped>

</style>