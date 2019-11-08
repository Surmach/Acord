const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from");
});

exports.getDrivers = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("drivers")
    .get()
    .then(data => {
      let drivers = [];
      data.forEach(doc => {
        drivers.push(doc.data());
      });
      return res.json(drivers);
    })
    .catch(err => console.error(err));
});

exports.setDriver = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      error: "Method not allowed"
    });
  }
  const newDriver = {
    name: req.body.name,
    surname: req.body.surname,
    father_name: req.body.father_name
  };

  admin
    .firestore()
    .collection("drivers")
    .add(newDriver)
    // eslint-disable-next-line promise/always-return
    .then(doc => {
      res.json({
        message: `document ${doc.id} created sucsess`
      });
    })

    .catch(err => {
      res.status(500).json({
        error: `somethin went wrong`
      });
      console.error(err);
    });
});
