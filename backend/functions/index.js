const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");


const app = express();

admin.initializeApp();

app.get("/drivers", (req, res) => {
  admin
    .firestore()
    .collection("drivers")
    .get()
    .then(data => {
      let drivers = [];
      data.forEach(doc => {
        drivers.push({
          driverId: doc.id,
          name: doc.data().name,
          surname: doc.data().surname,
          father_name: doc.data().father_name
        });
      });
      return res.json(drivers);
    })
    .catch(err => console.error(err));
});

app.post("/driver", (req, res) => {
  const newDriver = {
    name: req.body.name,
    surname: req.body.surname,
    father_name: req.body.father_name
  };

  admin
    .firestore()
    .collection("drivers")
    .add(newDriver)
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



exports.api = functions.region("europe-west1").https.onRequest(app);