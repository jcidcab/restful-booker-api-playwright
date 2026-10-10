# Restful-Booker - Automatización de API con Playwright

![Playwright Tests](https://github.com/jcidcab/restful-booker-api-playwright/actions/workflows/playwright.yml/badge.svg)

Pruebas automatizadas de la API pública [Restful-Booker](https://restful-booker.herokuapp.com), usando el cliente HTTP de Playwright.

## Stack
Playwright · JavaScript · Node.js · GitHub Actions

## Qué cubre
- Autenticación: token con credenciales válidas e inválidas
- Crear reservas (POST) y validar los datos guardados
- Consultar por id (GET), incluyendo un id inexistente
- Actualizar con PUT y PATCH, con token, sin token y con token inválido
- Eliminar (DELETE) y confirmar que la reserva ya no existe

## Estructura
- `tests/`: casos de prueba por endpoint
- `data/`: datos de prueba reutilizables
- `utils/`: funciones de apoyo (por ejemplo, obtener el token)

## Cómo ejecutarlo
```bash
npm install
npx playwright test
```

## Hallazgos de la API
- Con credenciales incorrectas responde 200 con `reason: "Bad credentials"`, en vez de 401.
- Al eliminar una reserva responde 201, en vez de 204.