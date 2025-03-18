<template>
    <div :id="props.htmlId" tabindex="-1" aria-hidden="true" class="background-popup hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative rounded-lg shadow-sm bg-gray-600">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 class="text-lg font-semibold text-white">
                        Create New Hero
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" :data-modal-toggle="props.htmlId">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name" class="block mb-2 text-sm font-medium text-white">Nombre</label>
                            <input type="text" v-model="hero.name" @input="validateName" name="name" id="name" class="border text-sm rounded-lg focus:outline-none focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Hero name">
                            <p class="text-red-600 text-sm mt-1" v-if="errorName.length !== 0">{{ errorName }}</p>
                        </div>
                        <div class="col-span-2">
                            <label for="file" class="block mb-2 text-sm font-medium text-white">Foto</label>
                            <input class="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400 file:bg-gray-900 file:hover:bg-gray-700 file:text-white file:p-2.5 file:cursor-pointer" id="file_input" type="file" accept="image/*" @change="handleFileUpload">
                            <p class="text-red-600 text-sm mt-1" v-if="errorPicture.length !== 0">{{ errorPicture }}</p>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="agility" class="block mb-2 text-sm font-medium  text-white">Agilidad</label>
                            <select id="agility" v-model="hero.attributes.agility" class=" border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                <option v-for="atributeValue in atributesSelectRange" :value="atributeValue">{{ atributeValue }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="strength" class="block mb-2 text-sm font-medium  text-white">Fuerza</label>
                            <select id="strength" v-model="hero.attributes.strength" class=" border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                <option v-for="atributeValue in atributesSelectRange" :value="atributeValue">{{ atributeValue }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="weight" class="block mb-2 text-sm font-medium  text-white">Peso</label>
                            <select id="weight" v-model="hero.attributes.weight" class=" border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                <option v-for="atributeValue in atributesSelectRange" :value="atributeValue">{{ atributeValue }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="endurance" class="block mb-2 text-sm font-medium  text-white">Resistencia</label>
                            <select id="endurance" v-model="hero.attributes.endurance" class=" border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                <option v-for="atributeValue in atributesSelectRange" :value="atributeValue">{{ atributeValue }}</option>
                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="charisma" class="block mb-2 text-sm font-medium text-white">Carisma</label>
                            <select id="charisma" v-model="hero.attributes.charisma" class=" border text-sm rounded-lg focus:ring-primary-500 focus:outline-none focus:border-primary-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
                                <option v-for="atributeValue in atributesSelectRange" :value="atributeValue">{{ atributeValue }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-row-reverse">
                        <button type="submit" class="flex items-center gap-1 button mt-3" @click.prevent="uploadHero">
                            <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            {{hero.id === '' ? 'Añadir Héroe' : 'Modificar Héroe'}}
                        </button>
                    </div>
                    <p class="font-bold mt-4" :class="{'text-green-200': resultUpload.status === 'OK', 'text-red-600': resultUpload.status === 'ERROR'}" v-if="resultUpload.result.length !== 0">{{ resultUpload.result }}</p>
                </form>
            </div>
        </div>
    </div> 
</template>

<script lang="ts" setup>
    import rangeAtributes from "@/assets/ts/rangeAtributes"
    import type { Hero } from "@/interfaces/heroes";
    import { useHeroeStore } from "@/stores/heroesStore";
    import { ref, toRaw, watch } from "vue";
    import { type helperApiReturn } from "../interfaces/utils";

    const atributesSelectRange = rangeAtributes;

    interface Props {
        htmlId:string,
        hero: Hero,
    }
    const props = defineProps<Props>();

    const storeHero = useHeroeStore();
    
    const emit = defineEmits<{
        (e: 'changeHero'): void
    }>();

    //+++ Datos del formulario ++++
    
    const hero = ref<Hero>(structuredClone(toRaw(props.hero)))
    

    async function uploadHero(): Promise<void> {
        if(hero.value.picture === "") {
            errorPicture.value = "Debes subir una imagen"
            return ;
        }

        validateName();

        if(errorName.value !== "")
            return;

        if(hero.value.id === '') 
            resultUpload.value = await storeHero.createHero(hero.value);
        else
            resultUpload.value = await storeHero.updateHero(hero.value);

        emit('changeHero');
    }


    //Control de errores
    const errorPicture = ref<string>("");
    const errorName = ref<string>("");
    const resultUpload = ref<helperApiReturn<string>>({status: 'OK', result: ""});

    function validateName(): void {
        const regex = /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+([ '-][A-ZÁÉÍÓÚÑa-záéíóúñ ]+)*( [A-ZÁÉÍÓÚÑa-záéíóúñ ]+([ '-][A-ZÁÉÍÓÚÑa-záéíóúñ ]+)*)?$/
        errorName.value = "";
        if(hero.value.name === '')
            errorName.value = "Debes poner un nombre";

        if(hero.value.name.length > 100)
            errorName.value = "El nombre no puede tener más de 100 carácteres";

        if(!regex.test(hero.value.name))
            errorName.value = "El nombre tiene carácteres no validos";
        
    }


    //+++ Funcionalidad para la subida de la imagen +++
    async function isValidImage(file: File): Promise<boolean> {
        const image = new Image();
        const reader = new FileReader();

        return new Promise<boolean>((resolve, reject) => {
            reader.onload = () => {
                    image.onload = () => {
                        if (image.width === 128 && image.height === 128) {
                            resolve(true);
                        } else {
                            
                            resolve(false);
                        }
                    }

                    image.onerror = () => {
                        resolve(false);
                    };

                    image.src = reader.result as string;
                };

                reader.onerror = () => {
                    reject(new Error("Error al leer el archivo"));
                };

                reader.readAsDataURL(file);
        });
    }

    function convertImageToBase64(file: File): Promise<string> {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onload = () => {
                resolve(reader.result as string);
            };

            reader.onerror = () => {
                reject(new Error("Error al leer el archivo"));
            };

            reader.readAsDataURL(file);
        });
    }

    // Función para manejar la carga del archivo
    async function handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        hero.value.picture = "";
        if (input?.files?.[0]) {
            const file = input.files[0];
            try {
                // Verifica si la imagen es válida
                const isValid = await isValidImage(file);

                if (isValid) {
                    // Convierte la imagen a base64
                    const base64Image = await convertImageToBase64(file);
                    hero.value.picture = base64Image;
                    errorPicture.value = ""
                } else {
                    errorPicture.value = "La imagen no tiene las dimensiones correctas (128x128px)";
                    input.value = ""
                }
            } catch (error) {
                errorPicture.value = `Error al procesar el archivo ${error}`;
                input.value = ""
            }
        }
    }

    watch(() => props.hero, async (newHero) => {
        //Actualiza con los datos del nuevo héroe y updatea
        hero.value = structuredClone(toRaw(newHero));
        errorPicture.value = ""
        errorName.value = ""
        resultUpload.value = {status: 'OK', result: ""}
    })
</script>