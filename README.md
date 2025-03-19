# Pentatlon de héroes

## Paquetes instalados externos
- axios
- flowbite  
  
## Estructura del proyecto
El proyecto esta dividido en los siguientes directorios:  
- api: en este lugar se guardarán los ficheros que contienen la configuración de axios para las apis (y métodos adicionales), en este caso solo la de heroes
- assets: Donde se guardan las imágenes y datos adicionales necesarios para la aplicación.
- components: Todos los componentes que no sean vistas.
- interfaces: Aquí se guardan las interfaces que se necesitan en la aplicación.
- routes: Rutas de la aplicación (solo hay tres)
- store: Aquí se guardan las stores del proyecto
- views: Aquí están las vistas de la app

## Funcionamiento de la aplicación resumido
La aplicación tiene tres vistas:  
- HeroesView: Donde está el funcionamiento crud de la aplicación
- LandingView: Una página con enlaces para ir a las demás vistas de la web
- PruebasView: Aquí se encuentra el funcionamiento del pentatlón  
  
La store *heroesStore* tiene todas las llamadas a la api de la aplicación, y se usa para obtener los datos. La configuración de las llamadas axios se encuentra en api/heroesApi.ts  


### Pruebas pentatlón (anotaciones adicionales)
Cuando se hace una prueba del pentatlón, el participante que más puntuación tenga ganará 5 puntos, el segundo 3 y el tercero 1 punto.  
En caso de empate, ambos participantes compartirán la posición, quedando primeros o segundos ambos (y recibiendo los puntos de la posición). Pudiéndose ser el caso, que haya dos primeros y un segundo o un primero y dos segundos. Esto también aplica en el resultado final de la competición.


## Variables de entorno
El proyecto necesita un fichero .env para arrancar con las siguientes dos variables:  
- VITE_API_KEY con la api key de la aplicación de la web
- VITE_API_URL=(con la url de la web)

## Arrancar el proyecto
Primero de todo, antes de arrancar el proyecto, es necesario ejecutar el siguiente comando para instalar todo:
```
npm install
```

Si necesitas ejecutar el proyecto tienes, puedes hacerlo sin montar la aplicación con:
```
npm run dev
```

Si quieres un paquete final, puedes ejecutar:
```
npm run build
```

Para tener una preview antes de subirlo a un servidor, utiliza:
```
npm run preview
```