const { test, expect } = require('@playwright/test');
const { newBooking } = require('../data/booking');
const { getToken } = require('../utils/auth');

test.describe('Actualizar reserva', () => {
  let id;
  let token;

  test.beforeEach(async ({ request }) => {
    // Obtener token
    token = await getToken(request);

    // Crear una reserva para actualizar
    const createResponse = await request.post('/booking', { data: newBooking() });
    const createBody = await createResponse.json();
    id = createBody.bookingid;
  });

  test('PUT reemplaza la reserva completa', async ({ request }) => {
    const response = await request.put(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
      data: newBooking({
        firstname: 'Pedro',
        lastname: 'Soto',
        totalprice: 200000,
        depositpaid: false,
        bookingdates: { checkin: '2026-12-01', checkout: '2026-12-10' },
        additionalneeds: 'Dinner',
}),
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe('Pedro');
    expect(body.lastname).toBe('Soto');
    expect(body.totalprice).toBe(200000);
  });

  test('PATCH modifica solo los campos enviados', async ({ request }) => {
    const response = await request.patch(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
      data: { lastname: 'Soto' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.lastname).toBe('Soto');
    expect(body.firstname).toBe('Juan');
  });

  test('PATCH sin token devuelve 403', async ({ request }) => {
    const response = await request.patch(`/booking/${id}`, {
      data: { lastname: 'Soto' },
    });

    expect(response.status()).toBe(403);
  });

    test('PATCH con token inválido devuelve 403', async ({ request }) => {
    const response = await request.patch(`/booking/${id}`, {
      headers: { Cookie: 'token=abc123falso' },
      data: { lastname: 'Soto' },
    });

    expect(response.status()).toBe(403);
  });
});
