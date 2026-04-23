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

const body = {
  name:  data.input.name,
  email: data.input.email,
};

if (data.input.company) {
  const companiesRes = await requestWithRetry({
    url: `https://api.prodpad.com/v1/companies?name=${encodeURIComponent(data.input.company)}`,
    method: 'GET',
    headers,
  });
  const companyId = companiesRes?.companies?.[0]?.id;
  if (companyId) body.company = companyId;
}

return requestWithRetry({
  url: 'https://api.prodpad.com/v1/contacts',
  method: 'POST',
  headers,
  body: JSON.stringify(body),
});
