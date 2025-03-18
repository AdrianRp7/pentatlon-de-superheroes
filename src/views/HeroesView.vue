<template>
    <div class="container mx-auto p-2 md:p-4">
        <div class="flex md:flex-row flex-col justify-between items-center  gap-2">
            <h1 class="text-2xl font-bold text-gray-700 underline">Lista de Heroes</h1>
            <button class="button" @click="cleanHero">
                Crear héroe
            </button>
        </div>
        <div class="mt-4">
            <div class="flex flex-col md:flex-row flex-wrap gap-3">
                <div class="card-hero  bg-gray-600 rounded-lg" v-for="hero in heroesStore.heroes">
                    <div class="card-data flex flex-col md:flex-row gap-3 p-3 items-center md:items-start">
                        <img class="rounded-lg" @error="hero.picture = defaultImagen" :src="hero.picture" :alt="`El nombre del héroe es ${hero.name}`" v-if="hero.picture" :key="hero.picture">
                        <img class="rounded-lg" src="@/assets/img/Personaje_Desconocido.jpg" alt="" v-else>
                        <div class="flex flex-col flex-wrap">
                            <h3 class="text-lg font-bold text-white mb-2">{{ hero.name }}</h3>
                            <div class="attributes-chips flex flex-wrap rounded-md gap-2 ">
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-25">
                                    Fuerza: {{ hero.attributes.strength }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-25">
                                    Agilidad: {{ hero.attributes.agility }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-25">
                                    Carisma: {{ hero.attributes.charisma }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-25">
                                    Peso: {{ hero.attributes.weight }}
                                </div>
                                <div class="bg-gray-300 p-1 text-gray-600 text-sm rounded-full w-25">
                                    Resistencia: {{ hero.attributes.endurance }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions p-3 flex flex-col md:flex-row justify-between w-full gap-2">
                        <button class="button-danger" @click="deleteHero(hero)">Borrar héroe</button>
                        <button class="button" @click="loadHero(hero)">Editar héroe</button>
                    </div>
                </div>
            </div>
        </div>
        
        <CreateEditHero @changeHero="getListHeroes" :html-id="idPopupCreate" :hero="hero"></CreateEditHero>
        <DeleteHero @deleteHero="getListHeroes" :html-id="idPopupDelete" :hero="hero"></DeleteHero>
    </div>
</template>

<script lang="ts" setup>
    import type { Hero } from '@/interfaces/heroes';
    import { useHeroeStore } from '@/stores/heroesStore';
    import { onMounted, ref } from 'vue';
    import { initFlowbite, Modal } from 'flowbite'
    import CreateEditHero from '@/components/CreateEditHero.vue';
    import defaultImagen from '@/assets/img/Personaje_Desconocido.jpg';
    import DeleteHero from '@/components/DeleteHero.vue';
    
    const heroesStore = useHeroeStore();
    const messageError = ref("");
    const idPopupCreate = "create-edit-hero"
    const idPopupDelete = "delete-hero"
    let modalCreateEdit:Modal; 
    let modalDelete:Modal; 

    const hero = ref<Hero>({
        id: "",
        name: "",
        picture: "",
        attributes: {
            agility: 1,
            strength: 1,
            weight: 1,
            endurance: 1,
            charisma: 1,
        }
    });
    

    function cleanHero() {
        hero.value = {
            id: "",
            name: "",
            picture: "",
            attributes: {
                agility: 1,
                strength: 1,
                weight: 1,
                endurance: 1,
                charisma: 1,
            }
        }
        modalCreateEdit.show()
    }
    
    function loadHero(heroCard: Hero) {
        hero.value = heroCard;
        modalCreateEdit.show()
    }

    function deleteHero(heroCard: Hero) {
        hero.value = heroCard;
        modalDelete.show()
    }

    async function getListHeroes() {
        const result = await heroesStore.getListHero();
        messageError.value = result !== 'OK' ? result : "";
    }

    onMounted(async ()=>{
        await getListHeroes()
        modalCreateEdit = new Modal(document.getElementById(idPopupCreate));
        modalDelete = new Modal(document.getElementById(idPopupDelete));
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