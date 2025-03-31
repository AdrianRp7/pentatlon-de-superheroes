import { type Hero } from '@/interfaces/heroes'
import heroesApi, {returnErrorMessage} from '@/api/heroesApi'
import type { helperApiReturn } from '@/interfaces/utils'


const HEROES_BASE_URL = '/pentathlon/heroes';

export function useHero() {
    const createHero = async (hero:Hero):Promise<helperApiReturn<string>> => {
        try {
            const result:Hero = (await heroesApi.post(`${HEROES_BASE_URL}`, hero)).data;

            return {status: "OK", result:`El heroe ${result.name} ha sido creado correctamente`}
        } catch(error) {
            return {status: "ERROR", result: returnErrorMessage(error)}
        }
    }

    const getHero = async (id: string):Promise<Hero | helperApiReturn<string>>  => {
        try {
            const result: Hero = (await heroesApi.get(`${HEROES_BASE_URL}/${id}`)).data;

            return result;
        } catch(error) {
            return {status: "ERROR", result: returnErrorMessage(error)}
        }
    }
    
    const getListHero = async ():Promise<helperApiReturn<string | Hero[]>> => {
        try {
            const result:Hero[] = (await heroesApi.get(`${HEROES_BASE_URL}/`)).data;

            return {status: "OK", result}
        } catch(error) {
            return {status: "ERROR", result: returnErrorMessage(error)}
        }
    }

    const updateHero = async (hero:Hero):Promise<helperApiReturn<string>> => {
        if(!hero.id) {
            return {status: "ERROR", result: "Debes añadir el id del heroe para modificarlo."}
        }

        try {
            const result:Hero = (await heroesApi.put(`${HEROES_BASE_URL}/${hero.id}`, hero)).data;
            
            return {status: "OK", result:`El heroe ${result.name} ha sido modificado correctamente`}
        } catch(error) {
            return {status: "ERROR", result: returnErrorMessage(error)}
        }
    }

    const deleteHero = async (id: string):Promise<helperApiReturn<string>> => {
        try {
            const {done} = (await heroesApi.delete(`${HEROES_BASE_URL}/${id}`)).data;

            if (done) {
                return {status: "OK", result: "El héroe ha sido borrado con éxito"}
            } else {
                return {status: "ERROR",  result: "El héroe no ha podido ser borrado con éxito"}
            }

        } catch(error) {
            return {status: "ERROR",  result: returnErrorMessage(error)}
        }
    }

    const getEmptyHero = ():Hero => {
        return {
            name: "",
            picture: "",
            attributes: {
                agility: 1,
                strength: 1,
                weight: 1,
                endurance: 1,
                charisma: 1,
            }
        };
    }

    return {createHero, getHero, getListHero, updateHero, deleteHero, getEmptyHero}
}

