const request = require("request");

const forecast = (lat, lon, callback) => {
  const url = `https://api.darksky.net/forecast/13028a7ddadf8a2cf9b9cc152d230c2a/${lat},${lon}?unit=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      console.log(url);
      callback("Bad request", undefined);
    } else {
      const data = body.currently;
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
