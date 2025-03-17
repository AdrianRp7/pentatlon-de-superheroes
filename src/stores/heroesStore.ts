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

    const getHero = async (id: string) => {
        let messageResult = "";
        try {
            const result:Hero = await heroesApi.post(`/pentathlon/heroes/${id}`);

            return result;
        } catch(error) {
            messageResult = returnErrorMessage(error)
        }

        return messageResult;
    }

    const getListHero = async () => {
        let messageResult = "";
        try {
            const result:Hero[] = await heroesApi.post(`/pentathlon/heroes/`);

            return result;
        } catch(error) {
            messageResult = returnErrorMessage(error)
        }

        return messageResult;
    }

    const updateHero = async (hero:Hero) => {
        let messageResult = "";
        if(hero.id) {
            try {
                const result:Hero = await heroesApi.put(`/pentathlon/heroes/${hero.id}`, hero);
    
                messageResult = `El heroe ${result.name} ha sido modificado correctamente`
            } catch(error) {
                messageResult = returnErrorMessage(error)
            }
        } else {
            messageResult = "Debes añadir el id del heroe para modificarlo."
        }

        return messageResult;
    }

    const deleteHero = async (id: string) => {
        let messageResult = "";
        try {
            const result:{done:string} = await heroesApi.post(`/pentathlon/heroes/`);

            if (result.done) {
                messageResult = "El héroe ha sido borrado con éxito"
            } else {
                messageResult = "El héroe no ha podido ser borrado con éxito"
            }

        } catch(error) {
            messageResult = returnErrorMessage(error)
        }

        return messageResult;
    }


    return {heroes, createHero, getHero, getListHero, updateHero, deleteHero}
})