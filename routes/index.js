import reportController from "../controllers/reports.controller";
import express from "express";
const router = express.Router();

router.get("/denuncias", (req, res) => {
  reportController.getAll(req, res);
});

router.post('/denuncias', (req,res) => {
    reportController.addReport(req,res);
});

export default router;
