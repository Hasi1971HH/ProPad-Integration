const headers = {
  'Authorization': `Bearer ${data.auth.apiKey}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
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

const parts = [`page=${data.input.page || 1}`];
if (data.input.tags)    parts.push(`tags=${encodeURIComponent(data.input.tags)}`);
if (data.input.status)  parts.push(`status=${encodeURIComponent(data.input.status)}`);
if (data.input.product) parts.push(`product=${encodeURIComponent(data.input.product)}`);

return requestWithRetry({
  url: `https://api.prodpad.com/v1/ideas?${parts.join('&')}`,
  method: 'GET',
  headers,
});
