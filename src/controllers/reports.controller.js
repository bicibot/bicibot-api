import Report from "../models/reports.model";

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
  let reportToAdd = Report({
    description: req.body.description
  });
  try {
    const savedReport = await Report.addReport(reportToAdd);
    res.send(savedReport);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

export default controller;
