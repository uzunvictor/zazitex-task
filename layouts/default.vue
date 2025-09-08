<template>
<div class="bg-gray-50">
    <Toast />
    <Header/>
    <div class="min-h-[100dvh] container mx-auto">
        <slot/>
    </div>
    <Footer/>
</div>
</template>

<script setup>
import Toast from 'primevue/toast';
</script>

<style lang="scss" scoped>

</style>