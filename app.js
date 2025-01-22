const { default: axios } = require("axios");
const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use("/", async (req, res) => {
  const path = req.path;

  let startUrl;

  if (path.startsWith("/-")) {
    startUrl = "https://assets.mercari-shops-static.com";
  } else if (path.startsWith("/item")) {
    startUrl = "https://static.mercdn.net";
  } else {
    startUrl = "https://static.mercdn.net";
  }

  const config = {
    method: "get",
    url: `${startUrl}${path}`,
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
