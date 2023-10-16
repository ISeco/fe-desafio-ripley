# FE Desafio Ripley

Este es un proyecto de Angular el cual consume una API hecha en Node.js y Typescript alojada en el servicio ECS de Amazon Web Services. El proyecto consiste en un formulario de login y registro de usuarios.

Este proyecto tiene la finalidad de abordar en un caso sencillo las buenas prácticas del framework como el uso de services, modules, guards, etc. Este nos permite aplicar manejo de formularios, autenticación de usuarios, protección de rutas, manejo de los datos y segmentación de la lógica de negocio en porciones de código mantenibles en el tiempo.

El sitio se encuentra alojado en el servicio de AWS Amplify. Adjunto link de la app: https://dev.d186i7t3xo67fl.amplifyapp.com/

### Nota
Debido a que la app de Angular tiene un dominio https, la app realiza peticiones a una url con el protocolo http por lo que el navegador bloqueará cualquier intento de realizar peticiones a esta URL, para solucionar este problema se debe ir a las configuraciones del sitio y darle permisos al `contenido no seguro`