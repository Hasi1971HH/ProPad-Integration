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

const body = {};
if (data.input.feedback) body.feedback = data.input.feedback;
if (data.input.tags) {
  body.tags = data.input.tags.split(',').map(t => ({ name: t.trim() })).filter(t => t.name);
}

return requestWithRetry({
  url: `https://api.prodpad.com/v1/feedbacks/${encodeURIComponent(data.input.feedbackId)}`,
  method: 'PUT',
  headers,
  body: JSON.stringify(body),
});
