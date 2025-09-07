<template>
<div class="min-h-screen bg-gray-50">
    <Toast />
    <Header/>
    <div class="container mx-auto min-h-screen">
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