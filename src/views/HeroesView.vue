<template>
    <div class="main-conatiner">
        <div class="flex md:flex-row flex-col justify-between items-center  gap-2">
            <h1 class="text-2xl font-bold text-gray-700 underline">Lista de Heroes</h1>
            <button class="button" @click="cleanHero">
                Crear héroe
            </button>
        </div>
        <div class="cards-container mt-4">
            <div class="flex flex-col md:flex-row flex-wrap justify-between gap-3" v-if="heroList.length !== 0">
                <CardHero :hero="hero" v-for="hero in heroList">
                    <template #actions>
                        <div class="card-actions p-3 flex flex-col md:flex-row justify-between w-full gap-2">
                            <button class="button-danger" @click="deleteHero(hero)">Borrar héroe</button>
                            <button class="button" @click="loadHero(hero)">Editar héroe</button>
                        </div>
                    </template>
                </CardHero>
            </div>
            <div class="flex flex-row justify-center" v-else>
                <h2 class="text-lg font-bold text-gray-500 mt-8 text-center">No has insertado ningún héroe</h2>
            </div>
        </div>
        
        <CreateEditHero @changeHero="changeHeroes" :html-id="idPopupCreate" :hero="hero"></CreateEditHero>
        <DeleteHero @deleteHero="changeHeroes" :html-id="idPopupDelete" :hero="hero"></DeleteHero>
    </div>
</template>

<script lang="ts" setup>
    import type { Hero } from '@/interfaces/heroes';
    import { onMounted, ref, useTemplateRef } from 'vue';
    import { initFlowbite, Modal } from 'flowbite'
    import CreateEditHero from '@/components/Hero/CreateEditHero.vue';
    import CardHero from '@/components/Hero/CardHero.vue';
    import DeleteHero from '@/components/Hero/DeleteHero.vue';
    import { useHero } from '@/composables/heroesComposable';
    
    const {getEmptyHero, getListHero} = useHero();
    const messageError = ref("");
    const idPopupCreate:string = "create-edit-hero"
    const idPopupDelete:string = "delete-hero"

    let modalCreateEdit:Modal; 
    let modalDelete:Modal; 

    const heroList = ref<Hero[]>([]);
    const hero = ref<Hero>(getEmptyHero());
    

    function cleanHero() {
        hero.value = getEmptyHero();
        modalCreateEdit.show()
    }
    
    function loadHero(heroCard: Hero) {
        hero.value = Object.assign({},heroCard);
        modalCreateEdit.show()
    }

    function deleteHero(heroCard: Hero) {
        hero.value = Object.assign({},heroCard);
        modalDelete.show()
    }

    async function getListHeroes() {
        const result = await getListHero();
        if(result.status === "OK") {
            heroList.value = result.result as Hero[];
        }
        else
            messageError.value = result.result as string;
    }

    async function changeHeroes() {
        await getListHeroes();
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

    @media screen and (min-width: 768px) {
        .cards-container {
            max-height: 80vh;
            overflow-y: auto;
        }
    }

</style>