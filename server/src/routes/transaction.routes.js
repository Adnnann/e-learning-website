import express from "express";
import transactionCtrl from "../controllers/transaction.controller";

const router = express.Router();

router
  .route("/api/transaction")
  .post(transactionCtrl.createTransaction)
  .get(transactionCtrl.getTransactions);

router
  .route("/api/transaction/:transactionId")
  .get(transactionCtrl.getTransaction)
  .put(transactionCtrl.updateTransaction)
  .delete(transactionCtrl.removeTransaction);

router.param("transactionId", transactionCtrl.transactionByID);

export default router;
