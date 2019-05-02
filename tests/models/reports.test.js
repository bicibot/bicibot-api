process.env.NODE_ENV = "test";
require("dotenv").config();
import Report from "../../src/models/reports.model";
import mongoose from "mongoose";
import signale from "signale";

mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://mongo:27017/test", { useNewUrlParser: true })
  .then(() => signale.success("Database connection successful"))
  .catch(err => signale.fatal(err));

//Our parent block
describe("Report model test", () => {
  beforeAll(async () => {
    await Report.deleteMany({});
  });

  afterEach(async () => {
    await Report.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("has a module", () => {
    expect(Report).toBeDefined();
  });

  describe("get report", () => {
    it("gets all reports", async () => {
      const report = new Report({
        description: "Report Description",
        location: [42.217539, -160.83109],
        report_type: "Ameaça",
        plate: "ABC-1241"
      });
      await report.save();

      const foundReports = await Report.getAll();
      expect(foundReports.length).toEqual(1);
    });

    it("gets a report", async () => {
      const report = new Report({
        description: "Report Description",
        location: [42.217539, -160.83109],
        report_type: "Ameaça",
        plate: "ABC-1241"
      });
      await report.save();

      const foundReport = await Report.findOne({
        description: "Report Description"
      });
      const expected = "Report Description";
      const actual = foundReport.description;
      expect(actual).toEqual(expected);
    });
  });

  describe("save report", () => {
    it("saves a report", async () => {
      const report = new Report({
        description: "Report Description",
        location: [42.217539, -160.83109],
        report_type: "Ameaça",
        plate: "ABC-1241"
      });
      const savedReport = await Report.addReport(report);

      const expected = "Report Description";
      const actual = savedReport.description;
      expect(actual).toEqual(expected);
    });
  });
});
