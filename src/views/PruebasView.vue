<template>
    <div class="main-conatiner">
        <h1 class="title">Pentatlón de Superhéroes</h1>
        <div class="flex flex-col md:flex-row justify-between">
            <section aria-label="Seleccionar héroes" class="flex flex-col">
               
            </section>
            <section aria-label="Resultado héroes">
                
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { Hero } from '@/interfaces/heroes';
    import { useHeroeStore } from '@/stores/heroesStore';
    import { onMounted, ref } from 'vue';


    const storeHero = useHeroeStore()
    const listHeroes = ref<Hero[]>([]);



    onMounted(()=>{

    })

    
</script>