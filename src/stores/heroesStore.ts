import {ref} from 'vue'
import { defineStore } from 'pinia'
import { type Hero } from '@/interfaces/heroes'
import heroesApi, {returnErrorMessage} from '@/api/heroesApi'
import type { helperApiReturn } from '@/interfaces/utils'


export const useHeroeStore = defineStore('heroe', () => {
    const heroes = ref<Hero[]>([])

    const createHero = async (hero:Hero):Promise<helperApiReturn<string>> => {
        let resultReturn:helperApiReturn<string> = { status: "ERROR", result: "Error desconocido, pruebe más tarde" };
        try {
            const result:Hero = (await heroesApi.post('/pentathlon/heroes/', hero)).data;

            resultReturn = {status: "OK", result:`El heroe ${result.name} ha sido creado correctamente`}
        } catch(error) {
            resultReturn = {status: "ERROR", result: returnErrorMessage(error)}
        }

        return resultReturn;
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
            const result:Hero[] = (await heroesApi.get(`/pentathlon/heroes/`)).data;

            heroes.value = result;
            messageResult = "OK"
        } catch(error) {
            messageResult = returnErrorMessage(error)
        }

        return messageResult;
    }

    const updateHero = async (hero:Hero):Promise<helperApiReturn<string>> => {
        let resultReturn:helperApiReturn<string> = { status: "ERROR", result: "Error desconocido, pruebe más tarde" };
        if(hero.id) {
            try {
                const result:Hero = (await heroesApi.put(`/pentathlon/heroes/${hero.id}`, hero)).data;
                
                resultReturn = {status: "OK", result:`El heroe ${result.name} ha sido modificado correctamente`}
            } catch(error) {
                resultReturn = {status: "ERROR", result: returnErrorMessage(error)}
            }
        } else {
            resultReturn = {status: "ERROR", result: "Debes añadir el id del heroe para modificarlo."}
        }

        return resultReturn;
    }

    const deleteHero = async (id: string) => {
        let messageResult = "";
        try {
            const result:{done:string} = await heroesApi.post(`/pentathlon/heroes/$`);

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