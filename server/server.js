require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const moongose = require("mongoose");

const userRouter = require("./routers/user");
const postRouter = require("./routers/post");
const uri = process.env.MONGODB_URI;
moongose
  .connect(uri || process.env.MONGO_URL, {
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
app.use("/image", express.static("./uploads"));
app.use("/auth", userRouter);
app.use("/post", postRouter);
app.get("/", (req, res) => res.send("Hello Wrold!"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`listen ${process.env.PORT || 5000} port`);
});
