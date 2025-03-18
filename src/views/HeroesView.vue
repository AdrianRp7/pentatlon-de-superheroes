<template>
    <div class="container mx-auto p-2 md:p-4">
        <div class="flex md:flex-row flex-col justify-between items-center  gap-2">
            <h1 class="text-2xl font-bold text-gray-700 underline">Lista de Heroes</h1>
            <button class="button" data-modal-target="create-edit-hero" data-modal-toggle="create-edit-hero">
                Crear héroe
            </button>
        </div>
        <div class="mt-4">
            <div class="flex flex-col md:flex-row flex-wrap gap-3">
                <div class="card-hero  bg-gray-600 rounded-lg" v-for="hero in heroesStore.heroes">
                    <div class="card-data flex flex-col md:flex-row gap-3 p-3 items-center md:items-start">
                        <img class="rounded-lg" :src="hero.picture" alt="" v-if="hero.picture">
                        <img class="rounded-lg" src="@/assets/img/Personaje_Desconocido.jpg" alt="" v-else>
                        <div class="flex flex-col flex-wrap">
                            <h3 class="text-lg font-bold text-white">{{ hero.name }}</h3>
                            <div class="attributes-chips flex flex-wrap rounded-md gap-2 ">
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-24">
                                    Fuerza: {{ hero.attributes.strength }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-24">
                                    Agilidad: {{ hero.attributes.agility }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-24">
                                    Carisma: {{ hero.attributes.charisma }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-24">
                                    Peso: {{ hero.attributes.weight }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-24">
                                    Resistencia: {{ hero.attributes.endurance }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions p-3 flex flex-col md:flex-row justify-between w-full gap-2">
                        <button class="!bg-red-600 hover:!bg-red-500 button">Borrar héroe</button>
                        <button class="button">Editar héroe</button>
                    </div>
                </div>
                <!-- <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-gray-900">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-center">
                                Foto
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3 text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b border-gray-200" v-for="hero in heroesStore.heroes">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap">
                                
                            </td>
                            <td class="px-6 py-4 text-center">
                                {{ hero.name }}
                            </td>
                            <td class="px-6 py-4 text-center">
                                a
                            </td>
                        </tr>
                    </tbody>
                </table> -->
            </div>
        </div>
        
        <CreateEditHero html-id="create-edit-hero"></CreateEditHero>
        
    </div>
</template>

<script lang="ts" setup>
    import type { Hero } from '@/interfaces/heroes';
    import { useHeroeStore } from '@/stores/heroesStore';
    import { onMounted, ref } from 'vue';
    import { initFlowbite } from 'flowbite'
    import CreateEditHero from '@/components/CreateEditHero.vue';
    
    const heroesStore = useHeroeStore();
    const messageError = ref("");

    onMounted(async ()=>{
        const result = await heroesStore.getListHero();
        messageError.value = result !== 'OK' ? result : "";
        initFlowbite();
    })
</script>

<style>
    .card-hero {
        width: 100%;
    }
    
    @media screen and (min-width: 768px) {
        .card-hero {
            width: calc(50% - 10px);
        }
    }

    .card-hero img{
        aspect-ratio: 1 / 1;
        width: 128px;
    }
</style>