<template>
    <div :id="props.htmlId" tabindex="-1" class="background-popup hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative rounded-lg shadow-sm bg-gray-600">
                <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" :data-modal-hide="props.htmlId">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <svg class="mx-auto mb-4 w-12 h-12 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 class="mb-5 text-lg font-normal text-gray-400">¿Estás seguro de que quieres borrar el héroe {{hero.name}}?</h3>
                    <div v-if="resultDelete.status === 'ERROR'">
                        <div class="flex flex-col md:flex-row gap-3 justify-center">
                            <button @click="deleteHero" type="button" class="button-danger">
                                Sí, estoy seguro
                            </button>
                            <button type="button" :data-modal-hide="props.htmlId" class="button">No, quiero volver</button>
                        </div>
                        <p class="font-bold mt-4 text-red-600 text-sm" v-if="resultDelete.result.length !== 0">{{ resultDelete.result }}</p>
                    </div>
                    <div v-else>
                        <p class="font-bold mt-4 text-green-200 text-sm">{{ resultDelete.result }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref, watch} from 'vue'
    import {type Hero} from '@/interfaces/heroes'
    import { useHeroeStore } from '@/stores/heroesStore';
    import type { helperApiReturn } from '@/interfaces/utils';

    interface Props {
        htmlId: string
        hero: Hero,
    }

    const props = defineProps<Props>();
    const emit = defineEmits<{
        (e: 'deleteHero'): void 
    }>();

    const heroesStore = useHeroeStore();

    const resultDelete = ref<helperApiReturn<string>>({status: 'ERROR', result: ""}) 

    
    async function deleteHero():Promise<void> {
        if(props.hero.id) {
            resultDelete.value = await heroesStore.deleteHero(props.hero.id)
            emit('deleteHero');
        }
    }

    watch(() => props.hero, () => {
        resultDelete.value = {status: 'ERROR', result: ""}
    })
</script>