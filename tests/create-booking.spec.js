const { test, expect } = require('@playwright/test');
const { newBooking } = require('../data/booking');

test.describe('POST /booking', () => {
  test('crear una reserva devuelve los datos enviados', async ({ request }) => {
    const nuevaReserva = newBooking();

    const response = await request.post('/booking', { data: nuevaReserva });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking.firstname).toBe('Juan');
    expect(body.booking.lastname).toBe('Cid');
    expect(body.booking.totalprice).toBe(150000);
  });

  test('validación de fechas', async ({ request }) => {
    const validarFecha = newBooking();
    const response = await request.post('/booking', { data: validarFecha });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking.bookingdates.checkin).toBe('2026-11-01');
    expect(body.booking.bookingdates.checkout).toBe('2026-11-05');
  });
});