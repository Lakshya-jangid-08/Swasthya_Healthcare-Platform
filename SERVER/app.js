const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");
const patientRouter = require("./routes/patient.routes");
const doctorRouter = require("./routes/doctor.routes");
const { chatRouter } = require("./routes/Chat.routes");
const userRoute = require("./routes/user.routes");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/patients", patientRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRoute);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;