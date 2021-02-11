const express = require("express");
const path = require("path");
const app = express();

const routes = require("./routes");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => { console.log(`Escutando na porta ${port}.`) });