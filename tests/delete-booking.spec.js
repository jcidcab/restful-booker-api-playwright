const { test, expect } = require('@playwright/test');

test.describe('DELETE /booking/:id', () => {
  let id;
  let token;

  test.beforeEach(async ({ request }) => {
    // Obtener token
    const authResponse = await request.post('/auth', {
      data: { username: 'admin', password: 'password123' },
    });
    const authBody = await authResponse.json();
    token = authBody.token;

    // Crear una reserva para borrar
    const createResponse = await request.post('/booking', {
      data: {
        firstname: 'Juan',
        lastname: 'Cid',
        totalprice: 150000,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-11-01',
          checkout: '2026-11-05',
        },
        additionalneeds: 'Breakfast',
      },
    });
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
});