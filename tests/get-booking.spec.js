const { test, expect } = require('@playwright/test');
const { newBooking } = require('../data/booking');

test.describe('GET /booking/:id', () => {
  test('consultar una reserva creada devuelve sus datos', async ({ request }) => {
    // 1. Crear una reserva
    const nuevaReserva = newBooking();

    const createResponse = await request.post('/booking', { data: nuevaReserva });
    const createBody = await createResponse.json();
    const id = createBody.bookingid;

    // 2. Consultarla por su id
    const getResponse = await request.get(`/booking/${id}`);

    // 3. Validar
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody.firstname).toBe('Juan');
    expect(getBody.lastname).toBe('Cid');
    expect(getBody.totalprice).toBe(150000);
  });

  test('consultar una reserva que no existe devuelve 404', async ({ request }) => {
    const response = await request.get('/booking/999999999');

    expect(response.status()).toBe(404);
  });
   
});