const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const baseUrl = process.env.BASE_URL;

app.use("/", async (req, res) => {
  const path = req.path;

  const config = {
    method: "get",
    url: `${baseUrl}${path}`,
    responseType: "arraybuffer",
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
    },
  };

  try {
    const response = await axios.request(config);
    const contentType = response.headers["content-type"];
    res.set("Content-Type", contentType);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
