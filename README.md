# Waggo - App de Exploración de Servicios para Mascotas 🐾

![Made with Love](https://img.shields.io/badge/Made%20with-Love-pink?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R2l0SHViIFNwb25zb3JzIGljb248L3RpdGxlPjxwYXRoIGQ9Ik0xNy42MjUgMS40OTljLTIuMzIgMC00LjM1NCAxLjIwMy01LjYyNSAzLjAzLTEuMjcxLTEuODI3LTMuMzA1LTMuMDMtNS42MjUtMy4wM0MzLjEyOSAxLjQ5OSAwIDQuMjUzIDAgOC4yNDljMCA0LjI3NSAzLjA2OCA3Ljg0NyA1LjgyOCAxMC4yMjdhMzMuMTQgMzMuMTQgMCAwIDAgNS42MTYgMy44NzZsLjAyOC4wMTcuMDA4LjAwMy0uMDAxLjAwM2MuMTYzLjA4NS4zNDIuMTI2LjUyMS4xMjUuMTText9bC0uMDAxLS4wMDMuMDA4LS4wMDMuMDI4LS4wMTdhMzMuMTQgMzMuMTQgMCAwIDAgNS42MTYtMy44NzZDMjAuOTM--0OS00LjUgNC4xMjUtNC41IDIuMDYgMCAzLjkxNCAxLjQ3OSA0LjU0NCAzLjY4NC4xNDMuNDk1LjU5Ni43OTYgMS4wODYuNzk2LjQ5LjAwMS45NDMtLjMwMiAxLjA4NS0uNzk2LjYzLTIuMjA1IDIuNDg0LTMuNjg0IDQuNTQ0LTMuNjg0IDIuMDA0IDAgNC4xMjUgMS43NDYgNC4xMjUgNC41IDAgMy4yMjUtMi4zNyA2LjIxNi01LjA0OCA4LjUyM3oiLz48L3N2Zz4=)

**Waggo** es una pequeña propuesta de una app con interfaz moderna, fluida y con identidad de marca diseñada para conectar a los dueños de mascotas con los mejores servicios de cuidado como Paseos, Peluquería, Veterinario, Concursos, Entrenamiento y Guardería.

## Instrucciones de Instalación y Uso

Este proyecto fue construido utilizando **Expo SDK 56** y **TypeScript**.

> ⚠️ **Nota importante sobre Expo Go:** Para este proyecto utilice el último SDK, que es el SDK 56, o sea que hay que actualizar la aplicación de **Expo Go** directamente desde la página oficial de Expo. La versión que está en la Play Store no está al día y carga nada más hasta el SDK 54.

1. Instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

## ¿Qué cambiarías en tu solución si este componente lo fueran a usar tres personas distintas del equipo en contextos diferentes?

Por cuestiones de tiempo, le di prioridad a la experiencia de usuario, a un diseño robusto y a los detalles visuales de la marca **Waggo**. Sin embargo, si tuviera que preparar este código para que tres compañeros lo reutilicen en contextos diferentes, yo creo que me gustaría:

- **Flexibilizar el tipado de TypeScript:** Ahorita las categorías están restringidas por TypeScript (solo se aceptan categorías como `Paseo`, `Veterinario`, `Guardería`, etc). Si otra persona quisiera usar esta misma pantalla para otros servicios, tendría que comentarle que actualice el contenido del archivo `mockData.ts` con sus propios datos y modifique la unión de tipos (`ServiceCategory`) en TypeScript para que acepte las nuevas categorías que su contexto requiera.
- **Quitar el acoplamiento visual de la marca:** Creé varias partes de la interfaz con una identidad gráfica muy enfocada en las mascotas la verdad (el logo `<WaggoLogo />`, iconos de patitas 🐾 y textos fijos como _"vuelve a intentar para consentir a tu peludo"_). Lo ideal sería abstraer estos elementos visuales y textos literales para que se puedan configurar fácilmente o dejar valores vacíos por defecto, permitiendo que el componente se limpie visualmente según el flujo donde se inserte.
- **Implementar Internacionalización (i18n) desde el inicio:** Si este proyecto fuera a escala real o internacional, añadiría soporte para múltiples idiomas (i18n). Por experiencias pasadas en otros proyectos, sé perfectamente que si no se estructuran las traducciones desde el primer día, migrar todos los textos fijos de la app más adelante se vuelve una tarea un poco tediosa y es fácil equivocarse. Si uno de los contexto es internacional lo mejor sería aplicar i18n desde el principio.
- **Mejorar el Calendario y Transiciones:** Por el límite de tiempo, para el formulario utilicé el selector de fecha nativo del sistema operativo del mobile. En una segunda etapa, diseñaría un componente de calendario 100% personalizado e integrado en la propia vista para elevar la experiencia. También aprovecharía para darle más cariño a las animaciones de transición entre pantallas al navegar.
- **Documentación y Limpieza:** Aprovecharía para limpiar el flujo de trabajo, agregar y mejorar los comentarios del código y documentar mejor el tipado de TypeScript para que cualquier compañero pueda entenderlos bastante rápido.

Los componentes ya están modularizados y separados en archivos individuales, por lo ya se podrían reutilizar hoy mismo, pero hacen falta estos ajustes en los textos y en las pantallas para que sean 100% aplicables a otro contexto.
