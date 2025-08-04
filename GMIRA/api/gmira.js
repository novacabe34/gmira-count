export default async function handler(req, res) {
  const { handle } = req.query;
  if (!handle) return res.status(400).json({ error: "No handle provided" });
  const token = process.env.TWITTER_BEARER;
  const startTime = new Date(Date.now() - 30*24*60*60*1000).toISOString();
  const resp = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=from:${handle}%20gmira&start_time=${startTime}&max_results=100`,
    { headers: { Authorization: `Bearer ${token}` }}
  );
  const data = await resp.json();
  if (data.errors) return res.status(500).json({ error: data.errors });
  res.status(200).json({ handle, count: data.meta?.result_count ?? 0 });
}
