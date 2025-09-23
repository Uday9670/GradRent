const { onRequest } = require("firebase-functions/https");

exports.sendEmailNotification = onRequest((req, res) => {
  res.status(200).send("Success! Server is listening on port 8080. Minimal test passed.");
});