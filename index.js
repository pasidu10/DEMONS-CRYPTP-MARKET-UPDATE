
```js
const axios = require("axios");

const sendMarketUpdate = async () => {
  try {
    const res = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
    const price = res.data.bpi.USD.rate;

    const message = `📊 *Market Update*\n\n💵 *BTC Price:* 
    
{price}\n🕒 *Time:* ${new Date().toLocaleTimeString()}\n\n🔗 Powered by *POWER-BUY PASIYA-MD*\n👤 Owner: +94766359869`;

    await axios.post("https://graph.facebook.com/v18.0/120363418668122910/messages", {
      messaging_product: "whatsapp",
      to: "whatsapp:+94766359869",
      type: "text",
      text: { body: message }
    }, {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        "Content-Type": "application/json"
      }
    });

    console.log("✅ Sent:", message);
  } catch (e) {
    console.error("❌ Error sending message:", e.message);
  }
};

// Every 4 hours = 14400000ms
setInterval(sendMarketUpdate, 14400000);

// First call
sendMarketUpdate();
```
