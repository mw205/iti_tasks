<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    console.log("carousel banner mounted");

});
onUnmounted(() => {
    console.log("carousel banner unmounted");
});
</script>
<template>

    <div class="carousel h-1/2 lg:h-screen w-full rounded-4xl ">
        <div id="slide1" class="carousel-item relative w-full">
            <img src="https://contents.mediadecathlon.com/p2393880/k$2218276b66b7e147c6cd53323fb131e4/men-s-running-shoes-jogflow-1001-black-grey.jpg"
                class="w-full h-full object-cover" />
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" class="btn btn-circle">❮</a>
                <a href="#slide2" class="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full">
            <img src="https://vader-prod.s3.amazonaws.com/1732025857-brooks-hyperion-2-and-gts-25254-673c9de28e386.jpg"
                class="w-full h-full object-cover" />
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" class="btn btn-circle">❮</a>
                <a href="#slide3" class="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full">
            <img src="https://runkeeper.com/cms/wp-content/uploads/sites/4/2021/04/SS23_GEL-CUMULUS-25_Highlight_CHIASI0016_SH09_03_FINAL.jpg"
                class="w-full h-full object-cover" />
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" class="btn btn-circle">❮</a>
                <a href="#slide4" class="btn btn-circle">❯</a>
            </div>
        </div>
        <div id="slide4" class="carousel-item relative w-full">
            <img src="https://i.rtings.com/assets/pages/CCetdHzc/best-asics-20250714-medium.jpg?format=auto"
                class="w-full h-full object-cover" />
            <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" class="btn btn-circle">❮</a>
                <a href="#slide1" class="btn btn-circle">❯</a>
            </div>
        </div>
    </div>
</template>
<style scoped></style>