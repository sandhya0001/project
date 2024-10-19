const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
require("./config/cloudinary").cloudinaryConnect();
require("./config/connectDB").connectDB();
const userRouter = require("./routes/userRoutes");
const eventRouter = require("./routes/eventRoute");
const pdfRouter = require("./routes/pdfRoute");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/v1", userRouter);
app.use("/api/v1", eventRouter);
app.use("/api/v1", pdfRouter);
app.use("/api/v1", paymentRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
