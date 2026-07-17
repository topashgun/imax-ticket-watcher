require("dotenv").config();

const { startWatcher } = require("./watcher");

startWatcher().catch(console.error);
