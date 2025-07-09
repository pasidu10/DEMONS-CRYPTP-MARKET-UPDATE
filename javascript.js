```javascript
require('dotenv').config();
const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const axios = require('axios');
const cron = require('node-cron');
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveState);

  async function fetchNews() {
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=1ce65a943c544d7da7aace877bc06760`);
      const articles = res.data.articles.slice(0, 5);
      let msg = '*📰 Top News Headlines:*';
      articles.forEach((a, i) => 
        msg += `{i + 1}. a.title`;
      );
      return msg;
     catch (err) 
      console.error('News fetch error:', err);
      return '🛑 Unable to fetch news.';
    

  cron.schedule('0 */4 * * *', async () => 
    const news = await fetchNews();
    const jid = `{process.env.+94766359869}@s.whatsapp.net`;
    await sock.sendMessage(jid, { text: news });
    console.log('✅ News sent!');
  });
}

startBot();
```
