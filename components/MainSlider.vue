<template>
<swiper :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        class="rounded overflow-hidden"
        :loop="true"
        :modules="modules"
        :navigation="true"
        :pagination="{dynamicBullets: true}">
    <swiper-slide v-for="s in slides" :key="s.title">
        <NuxtImg :src="s.image" :alt="s.title" class="w-full object-cover" loading="lazy"/>
    </swiper-slide>
</swiper>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

const modules = [Autoplay, Navigation, Pagination];

const slides = ref([
    {title: 'Slide 1', image: '/main_slider_1.jpg'},
    {title: 'Slide 2', image: '/main_slider_2.png'},
    {title: 'Slide 3', image: '/main_slider_3.jpg'},
]);

</script>

<style>
.swiper-button-prev, .swiper-button-next {
  color: white;
}
.swiper-pagination-bullet-active {
    background-color: white;
}
</style>