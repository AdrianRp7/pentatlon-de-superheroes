<template>
    <div class="main-conatiner">
        <h1 class="title mb-4">Pentatlón de Superhéroes</h1>
        <div class="flex flex-col lg:flex-row justify-between">
            <section aria-label="Seleccionar héroes" class="flex flex-col">
                <div v-for="i in TOTALHEROES" :key="i + 'selectHero'">
                    <label class="block mb-2 text-sm font-medium text-black">Participante {{ i }}</label>
                    <select 
                        class="border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block 
                        w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        v-model="heroesPentatlon[i-1]" @change="verifyParticipants">
                            <option v-for="hero in heroes" :key="hero.id" :value="hero">{{ hero.name }}</option>
                    </select>
                    <CardHero class="my-4" :hero="heroesPentatlon[i-1]" v-if="heroesPentatlon[i-1]"></CardHero>
                </div>
            </section>
            <section aria-label="Pentatlón héroes" class="flex justify-center items-center h-full">
                <p>{{ messagePentatlon }}</p>
                <button class="button" @click="doPentatlon()">Hacer pentatlón</button>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CardHero from '@/components/CardHero.vue';
    import type { Hero } from '@/interfaces/heroes';
    import type { Participant } from '@/interfaces/participant';
    import { useHeroeStore } from '@/stores/heroesStore';
    import { storeToRefs } from 'pinia';
    import { onMounted, ref, computed, toRaw } from 'vue';


    const storeHero = useHeroeStore()
    const {heroes} = storeToRefs(storeHero)
    const TOTALHEROES:number = 3

    const heroesPentatlon = ref<Hero[]>([]);
    const messagePentatlon = ref("Selecciona los heroes que participarán en el pentatlón");

    // const heroesNotSelected = computed<Hero[]>(() => {
    //     return heroes.value.filter((heroSelect:Hero) => {
    //         const heroFinded:number | undefined = heroesPentatlon.value?.findIndex(hero => heroSelect.id === hero.id)
    //         return heroFinded !== undefined && heroFinded === -1
    //     });
    // })

    function heroDuplicated():boolean {
        let heroIsDuplicated:boolean = false;
        
        heroesPentatlon.value.forEach(hero => {
            if(heroesPentatlon.value.filter(heroFilter => heroFilter.id === hero.id).length > 1) {
                heroIsDuplicated = true
            }
        })

        return heroIsDuplicated;
    }

    function verifyParticipants():void {
        if(heroDuplicated()) {
            messagePentatlon.value = "El mismo héroe no puede participar dos veces";
        }
        else if(heroesPentatlon.value.length !== TOTALHEROES) {
            messagePentatlon.value = "Selecciona los heroes que participarán en el pentatlón";
        } 
        else
            messagePentatlon.value = ""
    }

    function doPentatlon() {
        let participants:Participant[] = [];
        heroesPentatlon.value.forEach(hero => {
            participants.push({hero: hero, score: 0, trialsWon: []})
        });
    }

    onMounted(async ()=>{
        await storeHero.getListHero();
    })

    
</script>