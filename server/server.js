require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const moongose = require("mongoose");

const userRouter = require("./routers/user");
const postRouter = require("./routers/post");

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
app.use("/image", express.static("./uploads"));
app.use("/auth", userRouter);
app.use("/post", postRouter);

const server = http.createServer(process.env.PORT || 3000);
app.listen(server, () => {
  console.log(`listen ${server} port`);
});
