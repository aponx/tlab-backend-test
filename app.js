const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Selamat Datang pada Backend Test TLab oleh Aprilia Ramadhayanti." });
});
require("./app/routes/route.kategori.js")(app);
require("./app/routes/route.menu.js")(app);
require("./app/routes/route.bahan.js")(app);
require("./app/routes/route.menubahan.js")(app);

app.listen(8083, ()=>{
    console.log("running");
});