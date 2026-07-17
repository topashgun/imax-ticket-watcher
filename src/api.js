const axios = require("axios");

const headers = require("../config/headers");
const basePayload = require("../config/payload");
const config = require("../config/config");

async function fetchSessions(date) {
  const payload = {
    ...basePayload,
    mid: config.movieId,
    dated: date,
  };

  const response = await axios.post("https://api3.pvrcinemas.com/api/v1/booking/content/msessions", payload, {
    headers,
  });
  return response.data;
}

module.exports = {
  fetchSessions,
};
