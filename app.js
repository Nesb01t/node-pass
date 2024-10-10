const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.use("/", async (req, res) => {
  const path = req.path;

  const config = {
    method: "get",
    url: `https://static.mercdn.net/${path}`,
    responseType: "arraybuffer", // 确保接收到的是二进制数据
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
    },
  };

  try {
    const response = await axios.request(config);
    const contentType = response.headers["content-type"];
    res.set("Content-Type", contentType); // 设置响应头
    res.send(response.data); // 发送图片数据
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
