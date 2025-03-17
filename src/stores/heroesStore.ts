import {ref} from 'vue'
import { defineStore } from 'pinia'
import { type Hero } from '@/interfaces/heroes'
import heroesApi, {returnErrorMessage} from '@/api/heroesApi'
import type { errorApi } from '@/interfaces/erroresApi'
import axios, { AxiosError } from 'axios'


export const useHeroeStore = defineStore('heroe',() => {
    const heroes = ref<Hero[]>([])

    const createHero = async (hero:Hero) => {
        let messageResult = "";
        try {
            const result:Hero = await heroesApi.post('/pentathlon/heroes/', hero);

            messageResult = `El heroe ${result.name} ha sido creado correctamente`
        } catch(error) {
            messageResult = returnErrorMessage(error)
        }

        return messageResult;
    }

    const getHero = () => {
        
    }

    return {heroes, createHero, getHero}
})