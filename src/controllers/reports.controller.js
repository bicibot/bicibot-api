import geo from "mapbox-geocoding";
import Report from "../models/reports.model";

const { WebhookClient } = require("dialogflow-fulfillment");

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
      const agent = new WebhookClient({ request: req, response: res });
      const addReport = async () => {
        // TODO: Function refactor
        function geoCoding(address) {
          return new Promise(function(resolve, reject) {
            geo.geocode("mapbox.places", address, function(err, res) {
              if (!err) {
                resolve(res.features[0].center);
              } else {
                reject(new Error("Endereço não encontrado"));
              }
            });
          });
        }

        const isPlateValid = async plate => {
          let plateRegex = /^[a-zA-Z]{3}[0-9]{4}\b/; // Mover para arquivo de constantes
          return plateRegex.test(plate.replace("-", ""));
        };

        const latlng = await geoCoding(
          agent.contexts[0].parameters.location["street-address"]
        );
        const plate = (await isPlateValid(agent.parameters["report-plate"]))
          ? agent.parameters["report-plate"]
          : new Error("Placa invalida");

        const reportToAdd = new Report({
          description: agent.contexts[0].parameters["report-description"],
          report_type: agent.contexts[0].parameters["report-type"],
          location: latlng,
          plate: plate
        });

        try {
          await Report.addReport(reportToAdd);
          res.status(201);
          return agent.add("Denuncia realizada com sucesso.");
        } catch (err) {
          res.status(400);
          res.send(err);
          agent.add("Ocorreu um erro, por favor, tente novamente.");
        }
      };

      const intentMap = new Map();
      intentMap.set("denuncia2", addReport);
      intentMap.set("denuncia2 - yes", addReport);
      agent.handleRequest(intentMap);
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
