async function getToken(request) {
  const response = await request.post('/auth', {
    data: { username: 'admin', password: 'password123' },
  });
  const body = await response.json();
  return body.token;
}

module.exports = { getToken };