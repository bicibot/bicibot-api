import Report from "../models/reports.model";
import geo from "mapbox-geocoding";
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");

require("dotenv").config();

geo.setAccessToken(process.env.mapboxToken);

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
  if (req.header("authToken") === process.env.authToken) {
    try {
      const agent =  new WebhookClient({ request: req, response: res });

      await function addReport(agent) {
        // let reportToAdd = new Report({
        //   description: req.body.description
        // });
        // try {
        //   const savedReport = await Report.addReport(reportToAdd);
        //   res.send(savedReport);
        // } catch (err) {
        //   res.status(400);
        //   res.send(err);
        // }
        // } else {
        //   console.log("Entrou no Else");
        //   res.status(401);
        //   res.send();
        // }

        // let address = geo.geocode('mapbox.places', agent.parameters.location["street-address"], function (err, geoData) {
        //   return new Promise (function(resolve, reject) {
        //     if (geoData) {
        //       resolve(geoData.features[0].center);
        //     } else {
        //       reject(new Error(err));
        //     }
        //   })
        // });

        // geoCoding(agent.parameters.location["street-address"]).then(a => {
        //   console.log(a);
        // })

        const geoCoding = async address => {
          await geo.geocode("mapbox.places", address, function(err, geoData) {
            return geoData.features[0].center;
          });
        };

        const location = geoCoding(agent.parameters.location["street-address"]);
        console.log(location);

        return agent.add(`Sua localização é ${location}`);
      };
      let intentMap = new Map();
      intentMap.set("denuncia.tipo - no - address", addReport);
      agent.handleRequest(intentMap);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401);
    res.send();
  }
};

export default controller;
