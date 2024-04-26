import Express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";
import cors from "cors";
import fs from "fs";
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import uploadImg from "./template/uploadImg.js";
import addToDB from "./template/addToDB.js";
import getRandom from "./template/getRandom.js";
import getCoins from "./template/getCoins.js";
import filtration from "./template/filtration.js";

const corsOrigin = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const DB_URL =
  "mongodb+srv://S7b0t4:228008@cluster0.cpkfqq3.mongodb.net/?retryWrites=true&w=majority";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 5000;

const app = Express();

app.use(cors(corsOrigin));
app.use(Express.json());

app.use(Express.static(path.join(__dirname, 'Client', 'build')));



app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
});

app.get('/real-estate/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
});

async function startApp() {
  console.log("server is starting");
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log("Server has been started on", PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();

uploadImg(app);
getRandom(app);
getCoins(app);
filtration(app);
app.post("/real-estate-backend/filter", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const Posts = await Post.find().sort(req.body);
  res.send(Posts);
});

app.get("/real-estate-backend", async (req, res) => {
  const Posts = await Post.find().sort();
  res.set("Access-Control-Allow-Origin", "*");
  res.json(Posts);
});

app.get("/real-estate-backend/get-data", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Ошибка чтения папки загрузок");
    }
    res.send(files);
  });
});

app.post("/real-estate-backend/delete", (req, res) => {
  try {
    Post.deleteMany({ minimum_nights: "2" }).then((result) => {
      console.log(result);
      res.status(200).json("Successful");
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/real-estate-backend", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  addToDB(req, res);
});

app.get("/real-estate-backend/:id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const Posts = await Post.find();
  const id = req.params.id;
  const obj = Posts.find((obj) => obj._id.toString() === id);
  res.send(obj);
});
