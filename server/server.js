require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const moongose = require("mongoose");

const userRouter = require("./routers/user");

moongose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(console.log);

const corsOption = {
  origin: true,
  Credential: true,
};

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "secret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.get("/bye", (req, res) => {
  res.json({ message: "bye" });
});
app.listen(process.env.PORT, () => {
  console.log(`listen ${process.env.PORT} port`);
});
