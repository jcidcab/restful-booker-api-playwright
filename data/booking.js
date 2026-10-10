const newBooking = (overrides = {}) => ({
  firstname: 'Juan',
  lastname: 'Cid',
  totalprice: 150000,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-11-01',
    checkout: '2026-11-05',
  },
  additionalneeds: 'Breakfast',
  ...overrides,
});

module.exports = { newBooking };