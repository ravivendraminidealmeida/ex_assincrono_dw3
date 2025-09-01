const express = require("express");
const rotas = require("./routes/salaDeAulaRoutes")
const db = require("./config/db")

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use("/api", rotas);
app.listen(port, () => {
    console.log("App listening at port ${port}");
    db.createTable();
});