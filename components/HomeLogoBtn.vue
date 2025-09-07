<template>
<NuxtLink to="/" class="flex items-center" @click="() => emit('clickNative')">
    <NuxtImg src="/logo.svg" height="60" width="120" alt="Logo" loading="lazy"/>
</NuxtLink>
</template>

<script setup>
const emit = defineEmits(['clickNative']);
</script>

<style lang="scss" scoped>

</style>