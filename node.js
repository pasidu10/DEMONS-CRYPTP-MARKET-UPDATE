```js
const makeWASocket = require("@whiskeysockets/baileys").default;
const { useSingleFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys");
const P = require("pino");
const cron = require("cron").CronJob;
const axios = require("axios");

const { state, saveState } = useSingleFileAuthState("./auth_info.json");

const BROADCAST_ID = "120363418668122910@newsletter";
const BOT_NAME = "POWERD BUY PASIYA-MD ";
const OWNER_NUMBER = "+94766359869";
const CHANNEL_LINK = "https://whatsapp.com/channel/0029Vb63cuhG8l5By1LYhU1R";

async function startBot() {
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: "silent" }),
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== 401;
      if (shouldReconnect) startBot();
    } else if (connection === "open") {
      console.log("WhatsApp connected");
    }
  });

  async function getMarketStatus() {
    try {
