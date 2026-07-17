const dayjs = require("dayjs");

function logChecking(date) {
  console.log("----------------------------------------------------");
  console.log(`${dayjs().format("YYYY-MM-DD HH:mm:ss")} | Checking ${date}`);
}

function logNoAvailability(result) {
  console.log(`Cinema      : ${result.cinema}`);
  console.log(`Experience  : ${result.experience}`);
  console.log("Status      : No Available Shows");
  console.log("----------------------------------------------------\n");
}

function logAvailability(result) {
  console.log("\n========================================");
  console.log("🎬 TICKETS AVAILABLE");
  console.log("========================================");

  console.log(`Cinema : ${result.cinema}`);
  console.log(`Date   : ${result.date}`);

  console.log("\nShow Times:");

  result.shows.forEach((show) => {
    console.log(`  • ${show.showTime}`);
  });

  console.log("\n📞 Calling...");
  console.log("========================================\n");
}

function logSleeping(minutes) {
  console.log(`Waiting ${minutes} minutes...\n`);
}

module.exports = {
  logChecking,
  logNoAvailability,
  logAvailability,
  logSleeping,
};
