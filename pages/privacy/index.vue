<template>
<main class="max-w-7xl min-h-screen mx-auto px-4 md:px-6 py-8 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p class="mt-2 text-lg text-gray-600">Last updated: September 7, 2025</p>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card class="bg-white rounded-2xl shadow-lg p-8">
            <template #content>
                <div class="space-y-6 text-gray-600">
                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Introduction</h2>
                        <p>
                            At Line Food Market, we are committed to protecting your privacy. This Privacy Policy explains how we
                            collect, use, and safeguard your personal information when you visit our website or interact with our
                            services.
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and address provided when
                                you contact us, subscribe to our newsletter, or place an order.
                            </li>
                            <li><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address,
                                browser type, and pages visited.
                            </li>
                            <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience, such as
                                remembering your preferences.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">How We Use Your Information</h2>
                        <p>Your information is used to:</p>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Process and fulfill your orders.</li>
                            <li>Send you newsletters and promotional offers (with your consent).</li>
                            <li>Improve our website and customer service.</li>
                            <li>Comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Sharing Your Information</h2>
                        <p>
                            We do not sell your personal information. We may share it with trusted third parties (e.g., payment
                            processors, delivery services) solely to provide our services. These parties are required to protect your
                            data.
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Access, correct, or delete your personal information.</li>
                            <li>Opt out of marketing communications.</li>
                            <li>Disable cookies through your browser settings.</li>
                        </ul>
                        <p>
                            To exercise these rights, please contact us at
                            <a href="mailto:support@line.com" class="text-blue-600 hover:underline">support@line.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data. However, no method of transmission
                            over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 class="text-xl font-semibold text-gray-900 mb-2">Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at:
                            <br><strong>Email:</strong> <a href="mailto:support@line.com" class="text-blue-600 hover:underline">support@line.com</a>
                            <br><strong>Phone:</strong> <a href="tel:+5551234567" class="text-blue-600 hover:underline">(555) 123-4567</a>
                            <br><strong>Address:</strong> 123 Fresh Street, Suite 100, Food City, FC 12345
                        </p>
                    </section>
                </div>
            </template>
        </Card>
    </div>
</main>
</template>

<script setup>
import { useSeoMeta, useHead } from '#app';
import { Card } from 'primevue';

useSeoMeta({
    title: 'Line Food Market - Privacy Policy',
    description: 'Learn how Line Food Market protects your privacy and handles your personal information.',
    keywords: 'privacy policy, food market, groceries, Line, data protection',
    ogTitle: 'Line Food Market - Privacy Policy',
    ogDescription: 'Learn how Line Food Market protects your privacy and handles your personal information.',
    ogImage: 'https://line.com/images/og-privacy.jpg',
    ogUrl: 'https://line.com/privacy',
    ogType: 'website',
    ogSiteName: 'Line Food Market',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Line Food Market - Privacy Policy',
    twitterDescription: 'Learn about privacy and data protection at Line Food Market.',
    twitterImage: 'https://line.com/images/twitter-privacy.jpg'
});

useHead({
    link: [
        { rel: 'canonical', href: 'https://line.com/privacy' },
    ]
});
</script>

<style lang="scss" scoped>
</style>