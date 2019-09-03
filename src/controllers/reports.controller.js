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

controller.addReport = async (req, res) => {
  const removeEmpty = obj => {
    Object.entries(obj).forEach(
      ([key, val]) =>
        (val && typeof val === "object" && removeEmpty(val)) ||
        ((val === null || val === "") && delete obj[key])
    );
    return obj;
  };

  if (req.header("authToken") === process.env.authToken) {
    try {
      await Report.addReport(removeEmpty(req.body));
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
