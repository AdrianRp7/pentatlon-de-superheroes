<template>
    <div class="main-conatiner">
        <h1 class="title mb-4">Pentatlón de Superhéroes:</h1>
        <div class="flex flex-col justify-between">
            <p class="text-black text-md mb-4">Selecciona los héroes que participarán en el pentatlón</p>
            <section aria-label="Seleccionar héroes" class="flex flex-col lg:flex-row w-full justify-between gap-4">
                <div class="flex-1/3" v-for="i in TOTALHEROES" :key="i + 'selectHero'">
                    <label class="block mb-2 text-sm font-medium text-black">Participante {{ i }}</label>
                    <select 
                        class="border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block 
                        w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        v-model="heroesPentatlon[i-1]">
                            <option v-for="hero in heroList" :key="hero.id" :value="hero">{{ hero.name }}</option>
                    </select>
                    <CardHero class="my-4" :hero="heroesPentatlon[i-1]" v-if="heroesPentatlon[i-1]"></CardHero>
                </div>
            </section>
            <section aria-label="Pentatlón héroes" class="flex flex-col justify-center items-center w-full mt-8 mb-10">
                <p class="!cursor-not-allowed hover:!bg-gray-900 button" v-if="messagePentatlon !== 'OK'">Hacer pentatlón</p>
                <button class="button" @click="getWinner()" v-if="messagePentatlon === 'OK'">Hacer pentatlón</button>
                <p class="text-red-600 text-md mt-2" v-if="messagePentatlon !== 'OK'">{{ messagePentatlon }}</p>
            </section>
            <section aria-label="Resultados" class="mt-4 md:mt-7 mb-10" v-if="ranking.length !== 0">
                <p class="text-2xl text-black font-bold">El ganador del pentatlón es: {{ ranking[0].hero.name  }}</p>
                <div class="flex flex-col md:flex-row justify-between gap-6 mt-8">
                    <div class="flex-1/3" v-for="(rank) in ranking" :key="rank.hero.id + 'ranking'">
                        <div class="flex flex-col gap-1 items-center p-8 rounded-2xl" :class="{'bg-gold': rank.position === 1 , 'bg-silver': rank.position === 2, 'bg-copper': rank.position === 3}">
                            <p class="text-sm text-black mb-4">{{ rank.score }} <br> Puntos</p>
                            <div class="flex flex-row items-center gap-5">
                                <img class="rounded-full w-20" :src="rank.hero.picture" :alt="`Foto del héroe ${rank.hero.name}`">
                                <p class="text-sm text-black font-bold">{{ rank.hero.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full text-center mt-5">
                    <button class="button" @click="doAnotherPentatlon()">¿Hacer otro?</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CardHero from '@/components/Hero/CardHero.vue';
    import { useHero } from '@/composables/heroesComposable';
    import type { Hero } from '@/interfaces/heroes';
    import type { Participant, resultTrialPentatlon } from '@/interfaces/participant';
    import { computed, onMounted, ref} from 'vue';

    const {getListHero} = useHero();
    const heroList = ref<Hero[]>([]);
    const TOTALHEROES:number = 3

    const heroesPentatlon = ref<Hero[]>([]);

    function heroDuplicated():boolean {
        let heroesSet = new Set();
        
        return heroesPentatlon.value.some(hero => {
            if(heroesSet.has(hero.id)) return true;
            else {
                heroesSet.add(hero.id)
                return false
            }
        })
    }

    const messagePentatlon = computed(():string => {
        if(heroDuplicated()) {
            return "El mismo héroe no puede participar dos veces";
        }
        else if(heroesPentatlon.value.length !== TOTALHEROES) {
            return "";
        } 
        else
            return "OK"
    });


    /*** Calcular resultados ***/
    const ranking = ref<Participant[]>([]);

    function givePoints(participants:Participant[], resultTrial:resultTrialPentatlon[], trial:number):void {
        const resultByScored:resultTrialPentatlon[] = resultTrial.sort((result1, result2) => result2.result - result1.result)
        const score:number[] = [5,3,1]
        let actualScoreIndex = 0;
        const setResults = new Set()
        resultByScored.forEach((result,index) => {
            //Si es el mismo resultado del anterior, comparten puesto (los tres pueden ser primeros)
            if(setResults.has(result.result)) {
                actualScoreIndex--
                participants[result.index].score += score[actualScoreIndex]
            }
            //En caso contrario se le asigna el siguiente puesto
            else {
                setResults.add(result.result)
                participants[result.index].score += score[actualScoreIndex]
            }
            if(actualScoreIndex===0) participants[result.index].trialsWon.push(trial)
            actualScoreIndex++;
        })
    }

    function doPentatlon():Participant[] {
        let participants:Participant[] = [];
        heroesPentatlon.value.forEach(hero => {
            participants.push({hero: hero, score: 0, trialsWon: [], position: 0})
        });

        //Prueba 1: Trepar Rascacielos
        let results: resultTrialPentatlon[] = []
        participants.forEach((participant,index) => {
            results.push({index, result: participant.hero.attributes.strength * 4 - participant.hero.attributes.weight * 2})
        })

        givePoints(participants, results, 1);

        //Prueba 2: Contar chiste
        results = []
        participants.forEach((participant,index) => {
            const charismaRivals = 
                participants.filter(participantFiltered => participantFiltered.hero.id !== participant.hero.id)
                .reduce((previousValue:number, currentValue:Participant)=>{
                    return currentValue.hero.attributes.charisma + previousValue
                }, 0)
            results.push({index, result: (participant.hero.attributes.charisma ** 2) - charismaRivals})
        })

        givePoints(participants, results, 2);

        //Prueba 3: Tiro al villano
        results = []
        participants.forEach((participant,index) => {
            const extraPuntuacionUltimo:number = participants.filter(participantFiltered => participantFiltered.score < participant.score).length === 0 ? 5 : 0;
            results.push({index, result: (participant.hero.attributes.agility + participant.hero.attributes.strength) + extraPuntuacionUltimo})
        })

        givePoints(participants, results, 3);

        //Prueba 4: 200km lisos
        results = []
        participants.forEach((participant,index) => {
            const extraPuntuacionGanoPruebaAnterior:number = participant.trialsWon.includes(3) ? 10 : -1;
            results.push({index, result: (participant.hero.attributes.agility * 4) + extraPuntuacionGanoPruebaAnterior})
        })

        givePoints(participants, results, 4);

        //Prueba 5: Rescate de cien gatitos
        results = []
        participants.forEach((participant,index) => {
            const extraPuntuacionGanoDosPruebas:number = participant.trialsWon.length >= 2 ? 5 : 0;
            results.push({index, result: (participant.hero.attributes.agility * 2) + extraPuntuacionGanoDosPruebas})
        })

        givePoints(participants, results, 5);

        return participants;
    }

    /*** Cambiar el estado del pentatlón ***/
    function doAnotherPentatlon() {
        heroesPentatlon.value = []
        ranking.value = []
    }

    function getWinner() {
        ranking.value = doPentatlon();
        
        ranking.value = ranking.value.sort((result1, result2) => result2.score - result1.score)


        ranking.value.forEach((element, index) => {
            element.position = index + 1
            if(index > 0 && element.score === ranking.value[index-1].score)
                ranking.value[index].position = ranking.value[index-1].position
        });
    }

    onMounted(async ()=>{
        const result = await getListHero();
        if(result.status === "OK")
            heroList.value =  result.result as Hero[]
    })

    
</script>

<style scoped>
    .bg-gold {
        background-color: #EFB810;
    }

    .bg-silver {
        background-color: #c0c0c0;
    }

    .bg-copper {
        background-color: #b87333;
    }
</style>