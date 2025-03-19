<script lang="ts" setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <nav class="h-20 border-gray-200 bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <router-link :to="{name: 'landing'}" class="flex items-center space-x-3 rtl:space-x-reverse bg-gray-900">
                <img src="@/assets/img/logo.png" class="h-12 bg-gray-900" alt="Logo página web pentatlón" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white"></span>
            </router-link>
            <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto z-10" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-1 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-gray-900">
                    <li>
                        <router-link :to="{name: 'heroes'}" class="block py-2 px-3 rounded-sm bg-gray-900 md:bg-transparent md:border-0 md:p-0 text-gray-300 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Heroes</router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'pruebas'}" class="block py-2 px-3 rounded-sm bg-gray-900 md:bg-transparent md:border-0 md:p-0 text-gray-300 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">Pentatlón</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

