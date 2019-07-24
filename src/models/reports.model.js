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
      enum: ["threat", "maintenance", "invasion"],
      trim: true
    },
    plate: {
      type: String,
      trim: true,
      validate: {
        validator: function(p) {
          return /^[a-zA-Z]{3}[0-9]{4}\b/.test(p.replace("-", ""))
        },
        message: props => `${props.value} não é uma placa valida!`
      }
    },
    maintenace_type: {
      type: String,
      trim: true
    },
    maintenance_state: {
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
