const headers = {
  'Authorization': `Bearer ${data.auth.apiKey}`,
  'Accept': 'application/json',
};

async function requestWithRetry(opts) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await ld.request(opts);
      return res.json;
    } catch (err) {
      if (attempt === 2) throw err;
      await new Promise(r => setTimeout(r, (attempt + 1) * 2000));
    }
  }
}

const parts = [`q=${encodeURIComponent(data.input.query)}`];
if (data.input.type) parts.push(`type=${encodeURIComponent(data.input.type)}`);

return requestWithRetry({
  url: `https://api.prodpad.com/v1/search?${parts.join('&')}`,
  method: 'GET',
  headers,
});
