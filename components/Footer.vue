<template>
<footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 class="text-lg font-semibold mb-4">About Us</h3>
                <p class="text-gray-400 text-sm">
                    Line is your premier food market, offering fresh, high-quality ingredients and gourmet products.
                    Discover our curated selection and savor the taste of excellence!
                </p>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <NuxtLink to="/catalog" class="text-gray-400 hover:text-white transition">Catalog</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/blog" class="text-gray-400 hover:text-white transition">Blog</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/contacts" class="text-gray-400 hover:text-white transition">Contact</NuxtLink>
                    </li>
                </ul>
            </div>

            <div>
                <h3 class="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
                <div class="flex flex-col gap-4">
                    <InputText
                        v-model="email"
                        type="email"
                        placeholder="Enter your email"
                        class="w-full bg-gray-800 text-white border-gray-700 focus:border-blue-500"
                    />
                    <Button
                        label="Subscribe"
                        severity="success"
                        class="w-full bg-blue-600 hover:bg-blue-700"
                        :loading="isSubscribing"
                        :disabled="!email"
                        @click="subscribe"
                    />
                </div>
                <div class="mt-4 flex gap-4">
                    <a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-white transition">
                        <i class="pi pi-twitter text-xl"></i>
                    </a>
                    <a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-white transition">
                        <i class="pi pi-facebook text-xl"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-white transition">
                        <i class="pi pi-instagram text-xl"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            &copy; {{ currentYear }} Line. All rights reserved.
        </div>
    </div>
</footer>
</template>

<script setup>
import {InputText, Button} from 'primevue';
import {useToast} from 'primevue/usetoast';

const email = ref('');
const isSubscribing = ref(false);
const toast = useToast();

const currentYear = new Date().getFullYear();

const subscribe = async () => {
    if (!email.value) return;

    isSubscribing.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.add({severity: 'success', summary: 'Subscribed', detail: 'Thank you for subscribing!', life: 3000});
        email.value = '';
    } catch (error) {
        toast.add({severity: 'error', summary: 'Error', detail: 'Failed to subscribe. Please try again.', life: 3000});
    } finally {
        isSubscribing.value = false;
    }
};
</script>

<style lang="scss" scoped>
</style>