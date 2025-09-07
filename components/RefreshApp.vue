<template>
<Button icon="pi pi-refresh"
        :disabled="isLoading"
        :loading="isLoading"
        @click="refreshApp">
    Refresh App
</Button>
</template>

<script setup>
const {execute: refresh} = await useLazyFetch('/api/refresh', {
    method: 'PUT',
    watch: false,
    immediate: false,
    server: false,
})

const { isLoading, start, finish } = useLoadingIndicator({
    estimatedProgress: (duration, elapsed) => (2 / Math.PI * 100) * Math.atan(elapsed / duration * 100 / 50)
})

const refreshApp = async () => {
    try {
        start();
        await refresh();
    } catch (e) {
        console.error('refreshApp error: ', e);
    } finally {
        finish();
        window.location.reload();
    }
}
</script>

<style lang="scss" scoped>

</style>