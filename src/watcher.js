const config = require("../config/config");

const { fetchSessions } = require("./api");
const { findAvailableShow } = require("./parser");
const logger = require("./logger");
const { notify } = require("./notifier");

async function checkAvailability() {
  let found = false;

  for (const date of config.dates) {
    try {
      logger.logChecking(date);

      const response = await fetchSessions(date);

      const result = findAvailableShow(response);

      if (result.available) {
        logger.logAvailability(result);

        await notify(result);

        found = true;
        break;
      }

      logger.logNoAvailability(result);
    } catch (err) {
      console.error(err);
    }
  }

  return found;
}

module.exports = {
  checkAvailability,
};
