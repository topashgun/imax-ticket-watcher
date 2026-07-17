const config = require("../config/config");

const { fetchSessions } = require("./api");
const { findAvailableShow } = require("./parser");
const logger = require("./logger");
const { notify } = require("./notifier");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startWatcher() {
  while (true) {
    for (const date of config.dates) {
      try {
        logger.logChecking(date);

        const response = await fetchSessions(date);

        const result = findAvailableShow(response);

        if (result.available) {
          logger.logAvailability(result);

          await notify(result);

          process.exit(0);
        }

        logger.logNoAvailability(result);
      } catch (err) {
        console.error(err.message);
      }
    }

    logger.logSleeping(config.pollIntervalMinutes);

    await sleep(config.pollIntervalMinutes * 60 * 1000);
  }
}

module.exports = {
  startWatcher,
};
