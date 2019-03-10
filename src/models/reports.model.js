import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true
    },
    location: {
      type: [Number, Number],
      index: "2d",
      required: true
    },
    report_type: {
      type: String,
      required: true,
      trim: true,
    },
    plate: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

let reportsModel = mongoose.model("Report", reportSchema);

reportsModel.getAll = () => {
  return reportsModel.find({});
};

reportsModel.addReport = reportToAdd => {
  return reportToAdd.save();
};

export default reportsModel;
