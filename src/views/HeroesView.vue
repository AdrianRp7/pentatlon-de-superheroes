<template>
    <h1>Heroes</h1>
</template>

<script lang="ts" setup>
    import type { Hero } from '@/interfaces/heroes';
import { useHeroeStore } from '@/stores/heroesStore';
    
    const heroesStore = useHeroeStore();



    const hero:Hero = {
        name: "Vértice",
        picture: "iVBORw0KGgoAAAANSUhEUgAA...",
        attributes: {
            "agility": 7,
            "strength": 9,
            "weight": 8,
            "endurance": 10,
            "charisma": 10
        }
    }
    heroesStore.createHero(hero);
</script>