const twilio = require("twilio");

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function notify(result) {
  const showTimes = result.shows.map((show) => show.showTime).join(", ");

  const message = `
Good news.

Tickets are now available.

Theatre: ${result.cinema}.

Date: ${result.date}.

Show times are:
${showTimes}.
`;
  const call = await client.calls.create({
    twiml: `
<Response>
    <Say voice="alice">
        ${message}
    </Say>
</Response>`,
    from: process.env.TWILIO_FROM,
    to: process.env.TWILIO_TO,
  });

  console.log("📞 Call initiated:", call.sid);
}

module.exports = {
  notify,
};
