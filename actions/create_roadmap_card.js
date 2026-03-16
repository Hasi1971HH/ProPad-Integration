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

const body = { title: data.input.title };
if (data.input.description) body.description = data.input.description;
if (data.input.ideaId)      body.idea_id      = data.input.ideaId;

return requestWithRetry({
  url: `https://api.prodpad.com/v1/roadmaps/${encodeURIComponent(data.input.roadmapId)}/cards`,
  method: 'POST',
  headers,
  body: JSON.stringify(body),
});
