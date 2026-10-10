const { test, expect } = require('@playwright/test');

test.describe('GET /booking', () => {
  let response;

  test.beforeEach(async ({ request }) => {
  response = await request.get('/booking');
  });

  test('devuelve status 200', async () => {
    expect(response.status()).toBe(200);
  });

  test('devuelve una lista', async () => {
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });
});