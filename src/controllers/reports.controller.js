import geo from "mapbox-geocoding";
import Report from "../models/reports.model";
import Twitter from "twitter";

require("dotenv").config();

geo.setAccessToken(process.env.mapboxToken);

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const controller = {};

controller.getAll = async (req, res) => {
  try {
    const reports = await Report.getAll();
    if (reports.length === 0) {
      res.sendStatus(204);
    } else {
      res.send(reports);
    }
  } catch (err) {
    res.send(err);
  }
};

controller.addReport = async (req, res) => {
  const removeEmpty = obj => {
    Object.entries(obj).forEach(
      ([key, val]) =>
        (val && typeof val === "object" && removeEmpty(val)) ||
        ((val === null || val === "") && delete obj[key])
    );
    return obj;
  };

  const tweet = async report => {
    client
      .post("statuses/update", { status: report.description })
      .then(function(tweet) {
        console.log(tweet);
      })
      .catch(function(error) {
        throw error;
      });
  };

  if (req.header("authToken") === process.env.authToken) {
    try {
      let report = removeEmpty(req.body);
      await Report.addReport(report);
      await tweet(report);
      res.status(201);
      res.send("Denuncia realizada com sucesso");
    } catch (err) {
      res.status(400);
      res.send(err);
    }
  } else {
    res.status(401);
    res.send();
  }
};

export default controller;
