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

// vote: "love_it" | "like_it" | "not_for_me"
const body = { vote: data.input.vote };
if (data.input.userEmail) body.contact = { email: data.input.userEmail };

return requestWithRetry({
  url: `https://api.prodpad.com/v1/ideas/${encodeURIComponent(data.input.ideaId)}/votes`,
  method: 'POST',
  headers,
  body: JSON.stringify(body),
});
