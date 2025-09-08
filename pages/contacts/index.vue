<template>
<main class="max-w-7xl min-h-screen mx-auto px-4 md:px-6 py-8 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p class="mt-2 text-lg text-gray-600">We'd love to hear from you. Send us a message!</p>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div class="space-y-8">
                <Card class="bg-white rounded-2xl shadow-lg p-8">
                    <template #title>
                        <h2 class="text-2xl font-bold text-gray-900">Get in Touch</h2>
                    </template>
                    <template #content>
                        <div class="space-y-6">
                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <i class="pi pi-map-marker text-blue-600 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Address</h3>
                                    <p class="mt-1 text-gray-600">123 Fresh Street<br>Suite 100<br>Food City, FC 12345
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <i class="pi pi-phone text-green-600 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Phone</h3>
                                    <p class="mt-1 text-gray-600"><a href="tel:+5551234567"
                                                                     class="text-blue-600 hover:underline">(555)
                                        123-4567</a></p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <i class="pi pi-envelope text-purple-600 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Email</h3>
                                    <p class="mt-1 text-gray-600"><a href="mailto:support@line.com"
                                                                     class="text-blue-600 hover:underline">support@line.com</a>
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-start space-x-4">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <i class="pi pi-clock text-orange-600 text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">Business Hours</h3>
                                    <div class="mt-1 text-gray-600">
                                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>

                <Card class="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <template #content>
                        <div class="h-64 bg-gray-200 flex items-center justify-center">
                            <div class="text-center">
                                <i class="pi pi-map text-gray-400 text-5xl mb-2"></i>
                                <p class="text-sm text-gray-500">Interactive Map</p>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>

            <Card class="bg-white rounded-2xl shadow-lg p-8">
                <template #title>
                    <h2 class="text-2xl font-bold text-gray-900">Send us a Message</h2>
                </template>
                <template #content>
                    <form @submit.prevent="submitForm" class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name
                                    *</label>
                                <InputText
                                    id="firstName"
                                    v-model="form.firstName"
                                    placeholder="John"
                                    class="p-inputtext-sm w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    :disabled="isSubmitting"
                                    required
                                />
                            </div>
                            <div>
                                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name
                                    *</label>
                                <InputText
                                    id="lastName"
                                    v-model="form.lastName"
                                    placeholder="Doe"
                                    class="p-inputtext-sm w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    :disabled="isSubmitting"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address
                                *</label>
                            <InputText
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="john.doe@example.com"
                                class="p-inputtext-sm w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                :disabled="isSubmitting"
                                required
                            />
                        </div>

                        <div>
                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <InputText
                                id="phone"
                                v-model="form.phone"
                                type="tel"
                                placeholder="(555) 123-4567"
                                class="p-inputtext-sm w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                :disabled="isSubmitting"
                            />
                        </div>

                        <div>
                            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                            <Dropdown
                                id="subject"
                                v-model="form.subject"
                                :options="subjects"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select a subject"
                                class="p-inputtext-sm w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                :disabled="isSubmitting"
                                required
                            />
                        </div>

                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                            <Textarea
                                id="message"
                                v-model="form.message"
                                placeholder="Please describe your inquiry in detail..."
                                rows="5"
                                class="p-inputtext-sm w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                                :disabled="isSubmitting"
                                required
                            />
                        </div>

                        <div class="flex items-start space-x-3">
                            <Checkbox
                                id="privacy"
                                v-model="form.agreeToPrivacy"
                                :binary="true"
                                class="mt-1"
                                :disabled="isSubmitting"
                                required
                            />
                            <label for="privacy" class="text-sm text-gray-600">
                                I agree to the
                                <NuxtLink to="/privacy" class="text-blue-600 hover:text-blue-800 underline">Privacy
                                    Policy
                                </NuxtLink>
                                and consent to being contacted regarding my inquiry. *
                            </label>
                        </div>

                        <div class="pt-4">
                            <Button
                                :label="isSubmitting ? 'Sending...' : 'Send Message'"
                                severity="success"
                                class="w-full bg-blue-600 hover:bg-blue-700 rounded-lg"
                                :loading="isSubmitting"
                                :disabled="isSubmitting || !form.firstName || !form.lastName || !form.email || !form.subject || !form.message || !form.agreeToPrivacy"
                            />
                        </div>
                    </form>
                </template>
            </Card>
        </div>
    </div>
</main>
</template>

<script setup>
import {useSeoMeta, useHead} from '#app';
import {Card, InputText, Textarea, Dropdown, Button, Checkbox} from 'primevue';
import {useToast} from 'primevue/usetoast';

useSeoMeta({
    title: 'Line Food Market - Contact Us',
    description: 'Get in touch with Line Food Market. Reach out for inquiries, support, or feedback about our fresh groceries and gourmet products.',
    keywords: 'contact, food market, groceries, Line, support',
    ogTitle: 'Line Food Market - Contact Us',
    ogDescription: 'Get in touch with Line Food Market. Reach out for inquiries, support, or feedback about our fresh groceries and gourmet products.',
    ogImage: 'https://line.com/images/og-contact.jpg',
    ogUrl: 'https://line.com/contact',
    ogType: 'website',
    ogSiteName: 'Line Food Market',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Line Food Market - Contact Us',
    twitterDescription: 'Contact Line Food Market for inquiries or support.',
    twitterImage: 'https://line.com/images/twitter-contact.jpg'
});

useHead({
    link: [
        {rel: 'canonical', href: 'https://line.com/contact'},
    ]
});

const toast = useToast();
const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToPrivacy: false
});
const isSubmitting = ref(false);

const subjects = [
    {label: 'General Inquiry', value: 'general'},
    {label: 'Technical Support', value: 'support'},
    {label: 'Sales Question', value: 'sales'},
    {label: 'Partnership Opportunity', value: 'partnership'},
    {label: 'Other', value: 'other'}
];

const submitForm = async () => {
    isSubmitting.value = true;
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.add({
            severity: 'success',
            summary: 'Message Sent',
            detail: 'Thank you for contacting Line Food Market! We’ll get back to you soon.',
            life: 3000
        });
        Object.keys(form).forEach(key => {
            form[key] = typeof form[key] === 'boolean' ? false : '';
        });
    } catch (error) {
        console.error('Form submission error:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to send message. Please try again.',
            life: 3000
        });
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style lang="scss" scoped>
</style>