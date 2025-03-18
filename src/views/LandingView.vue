<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="landing-background min-h-full min-w-full flex flex-col justify-center items-strech">
        <h1 class="text-3xl font-bold underline text-center text-white">Bienvenido al pentatlón de heroes</h1>
        <div class="flex sm:flex-col md:flex-row justify-center align-center gap-3 mt-4">
            <router-link class="button" :to="{name: 'heroes'}">Crear héroe</router-link>
            <router-link class="button" :to="{name: 'pruebas'}">Crear Pentatlón</router-link>
        </div>
    </div>
</template>

<style scoped>
    .landing-background {
        background: linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.75) 100%), url('@/assets/img/landingBackground.jpg');
        background-size: cover;
        background-repeat: no-repeat; 
    }
</style>