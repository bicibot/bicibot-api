import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const imageSchema = new mongoose.Schema({
  type: String,
  data: Buffer
});

const reportSchema = new mongoose.Schema(
  {
    description: { type: String, trim: true },
    location: {
      type: pointSchema
    },
    report_type: String,
    plate: { type: String, trim: true },
    img: {
      type: imageSchema
    }
  },
  { timestamps: true }
);

let reportsModel = mongoose.model('Report', reportSchema);


reportsModel.getAll = () => {
  return reportsModel.find({});
}

reportsModel.addReport = (reportToAdd) => {
  return reportToAdd.save();
}

export default reportsModel;
