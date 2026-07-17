require("dotenv").config();

const { checkAvailability } = require("./watcher");

(async () => {
  try {
    const found = await checkAvailability();

    if (found) {
      console.log("Ticket found. Notification sent.");
    } else {
      console.log("No tickets available.");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
