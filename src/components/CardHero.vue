<template>
    <div class="card-hero  bg-gray-600 rounded-lg">
        <div class="card-data flex flex-col md:flex-row gap-3 p-3 items-center md:items-start">
            <img class="rounded-lg" @error="props.hero.picture = defaultImagen" :src="props.hero.picture" :alt="`El nombre del héroe es ${props.hero.name}`" v-if="props.hero.picture" :key="props.hero.picture">
            <img class="rounded-lg" src="@/assets/img/Personaje_Desconocido.jpg" alt="" v-else>
            <div class="flex flex-col flex-wrap">
                <h3 class="text-lg font-bold text-white mb-2">{{ props.hero.name }}</h3>
                <div class="attributes-chips flex flex-wrap rounded-md gap-2 ">
                    <div class="bg-gray-300 p-1 text-gray-900 text-sm rounded-full text-center font-medium w-25">
                        Fuerza: {{ props.hero.attributes.strength }}
                    </div>
                    <div class="bg-gray-300 p-1 text-gray-900 text-sm rounded-full text-center font-medium w-25">
                        Agilidad: {{ props.hero.attributes.agility }}
                    </div>
                    <div class="bg-gray-300 p-1 text-gray-900 text-sm rounded-full text-center font-medium w-25">
                        Carisma: {{ props.hero.attributes.charisma }}
                    </div>
                    <div class="bg-gray-300 p-1 text-gray-900 text-sm rounded-full text-center font-medium w-25">
                        Peso: {{ props.hero.attributes.weight }}
                    </div>
                    <div class="bg-gray-300 p-1 text-gray-900 text-sm rounded-full text-center font-medium w-25">
                        Resistencia: {{ props.hero.attributes.endurance }}
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="card-actions p-3 flex flex-col md:flex-row justify-between w-full gap-2"> -->
        <slot name="actions"></slot>
        <!-- </div> -->
    </div>
</template>

<script lang="ts" setup>
    import type { Hero } from '@/interfaces/heroes';
    import defaultImagen from '@/assets/img/Personaje_Desconocido.jpg';

    interface Props {
        hero: Hero
    }

    const props = defineProps<Props>();
</script>

<style scoped>
    .card-hero img{
        aspect-ratio: 1 / 1;
        width: 128px;
    }
</style>