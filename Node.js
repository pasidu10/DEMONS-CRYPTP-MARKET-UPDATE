---

Code Overview (Node.js):
1. *BTC Price Fetching:*
```js
const axios = require('axios');

async function getBTCPrice() {
  const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
  return res.data.bitcoin.usd;
}
```
2.
```js
const twilio = require('twilio');
const client = twilio('YOUR_SID', 'caming soon');

async function sendWhatsApp(price) {
  await client.messages.create({
    body: `🪙 BTC 4H Update:\nCurrent Price: 
    
{price}`,
    from: 'whatsapp:+94766359869',
    to: 'whatsapp:+94766359869' // Group broadcast via approved Twilio sender
  });
}
```

3. *Scheduler:*
```js
setInterval(async () => {
  const price = await getBTCPrice();
  await sendWhatsApp(price);
}, 4 * 60 * 60 * 1000); // every 4 hours
```

---
