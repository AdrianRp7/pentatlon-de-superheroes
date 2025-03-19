<template>
    <div class="main-conatiner">
        <div class="flex md:flex-row flex-col justify-between items-center  gap-2">
            <h1 class="text-2xl font-bold text-gray-700 underline">Lista de Heroes</h1>
            <button class="button" @click="cleanHero">
                Crear héroe
            </button>
        </div>
        <div class="mt-4">
            <div class="flex flex-col md:flex-row flex-wrap justify-between gap-3" v-if="heroesStore.heroes.length !== 0">
                <CardHero :hero="hero" v-for="hero in heroesStore.heroes">
                    <template #actions>
                        <div class="card-actions p-3 flex flex-col md:flex-row justify-between w-full gap-2">
                            <button class="button-danger" @click="deleteHero(hero)">Borrar héroe</button>
                            <button class="button" @click="loadHero(hero)">Editar héroe</button>
                        </div>
                    </template>
                </CardHero>
            </div>
            <div class="flex flex-row justify-center" v-else>
                <h2 class="text-lg font-bold text-gray-500 mt-8 text-center">No has insertado ningún héroe, inténtalo</h2>
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
    import CardHero from '@/components/CardHero.vue';
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

<style scoped>
    :deep(.card-hero) {
        width: 100%;
    }
    
    @media screen and (min-width: 768px) {
        :deep(.card-hero) {
            width: calc(50% - 10px);
        }
    }
</style>