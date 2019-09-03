import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: false
    },
    location: {
      type: Object,
      index: "2d",
      required: true
    },
    city: {
      type: String,
      required: true,
      enum: ["Recife", "São Paulo"],
      trim: true
    },
    report_type: {
      type: String,
      required: true,
      enum: ["Ameaça", "Manutenção", "Invasão"],
      trim: true
    },
    plate: {
      type: String,
      trim: true,
      validate: {
        validator: function(p) {
          return /^[a-zA-Z]{3}[0-9]{4}\b/.test(p.replace("-", ""));
        },
        message: props => `${props.value} não é uma placa valida!`
      }
    },
    maintenace_type: {
      type: String,
      trim: true
    },
    invasion_state: {
      type: String,
      trim: true
    },
    invasion_vehicle: {
      type: String,
      trim: true
    },
    invasion_time: {
      type: String,
      trim: true
    },
    bus_company: {
      type: String,
      trim: true
    },
    bus_number: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

Report.getAll = () => {
  return Report.find({});
};

Report.addReport = async reportToAdd => {
  return await new Report(reportToAdd).save();
};

export default Report;
