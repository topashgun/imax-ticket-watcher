const config = require("../config/config");

function findAvailableShow(data) {
  const cinemas = data?.output?.movieCinemaSessions || [];

  for (const cinema of cinemas) {
    if (cinema.cinema.name !== config.cinemaName) {
      continue;
    }

    for (const exp of cinema.experienceSessions || []) {
      if (exp.experience !== config.experience) {
        continue;
      }

      const availableShows = exp.shows.filter((show) => show.statusTxt === "Available");

      if (availableShows.length > 0) {
        return {
          available: true,
          cinema: cinema.cinema.name,
          experience: exp.experience,
          date: availableShows[0].showDate,
          shows: availableShows,
        };
      }

      return {
        available: false,
        cinema: cinema.cinema.name,
        experience: exp.experience,
      };
    }

    // Cinema found, but requested experience not found
    return {
      available: false,
      cinema: cinema.cinema.name,
      experience: config.experience,
    };
  }

  // Cinema itself not found
  return {
    available: false,
    cinema: config.cinemaName,
    experience: config.experience,
  };
}

module.exports = {
  findAvailableShow,
};
