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

const body = { feedback: data.input.feedback };

if (data.input.userName || data.input.userEmail) {
  body.name = data.input.userName || data.input.userEmail;
  if (data.input.userEmail) body.email = data.input.userEmail;
}

if (data.input.tags) {
  const tagNames = data.input.tags.split(',').map(t => t.trim()).filter(Boolean);
  const allTags = await requestWithRetry({
    url: 'https://api.prodpad.com/v1/tags',
    method: 'GET',
    headers,
  });
  body.tags = tagNames
    .map(name => {
      const match = (allTags || []).find(t => t.tag.toLowerCase() === name.toLowerCase());
      return match ? match.id : null;
    })
    .filter(Boolean);
}

return requestWithRetry({
  url: 'https://api.prodpad.com/v1/feedbacks',
  method: 'POST',
  headers,
  body: JSON.stringify(body),
});
