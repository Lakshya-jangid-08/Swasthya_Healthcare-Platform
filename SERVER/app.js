const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const patientRouter = require("./routes/patient.routes");
const doctorRouter = require("./routes/doctor.routes");
const transactionRouter = require("./routes/transaction.route");
const chatRouter = require("./routes/chat.routes");


const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/chats", chatRouter);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;