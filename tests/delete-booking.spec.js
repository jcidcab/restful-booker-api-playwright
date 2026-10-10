const { test, expect } = require('@playwright/test');
const { newBooking } = require('../data/booking');
const { getToken } = require('../utils/auth');

test.describe('DELETE /booking/:id', () => {
  let id;
  let token;

  test.beforeEach(async ({ request }) => {
    // Obtener token
    token = await getToken(request);

    // Crear una reserva para borrar
    const createResponse = await request.post('/booking', { data: newBooking() });
    const createBody = await createResponse.json();
    id = createBody.bookingid;
  });

  test('eliminar una reserva y confirmar que ya no existe', async ({ request }) => {
    // 1. Eliminar
    const deleteResponse = await request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(deleteResponse.status()).toBe(201);

    // 2. Confirmar que ya no existe
    const getResponse = await request.get(`/booking/${id}`);
    expect(getResponse.status()).toBe(404);
  });

    test('eliminar sin token devuelve 403 y la reserva sigue existiendo', async ({ request }) => {
    const deleteResponse = await request.delete(`/booking/${id}`);
    expect(deleteResponse.status()).toBe(403);

    const getResponse = await request.get(`/booking/${id}`);
    expect(getResponse.status()).toBe(200);
  });
});