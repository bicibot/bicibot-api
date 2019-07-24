import geo from "mapbox-geocoding";
import Report from "../models/reports.model";

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

// function geoCoding(address) {
//   return new Promise(function(resolve, reject) {
//     geo.geocode("mapbox.places", address, function(err, res) {
//       if (!err) {
//         resolve(res.features[0].center);
//       } else {
//         reject(new Error("Endereço não encontrado"));
//       }
//     });
//   });
// }

// const latlng = await geoCoding(
//   agent.contexts[0].parameters.location["street-address"]
// );


controller.addReport = async (req, res) => {
  if (req.header("authToken") === process.env.authToken) {
    try {
      await Report.addReport(req.body);
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
