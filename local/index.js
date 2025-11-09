const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Serve API from the Backend Handler
app.all("/api/*path", (req, res) => {
  const { handler } = require("../backend/dist");
  handler({
    headers: req.headers,
    httpMethod: req.method,
    path: req.path.substring(4),
    queryStringParameters: req.query,
  })
    .then((response) => {
      res.status(response.statusCode);
      if (response.headers) {
        Object.entries(response.headers).forEach(([key, value]) => {
          res.header(key, value.toString());
        });
      }
      res.send(response.body);
    })
    .catch((e) => {
      res.status(500);
      res.send(e);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
