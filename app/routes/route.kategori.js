module.exports = app => {
    const kategori = require("../controllers/controller.kategori.js");
    var router = require("express").Router();
    router.post("/", kategori.create);
    router.delete("/:id", kategori.delete);
    router.put("/:id", kategori.update);
    router.get("/:id", kategori.findOne);
    router.get("/", kategori.findAll);
    app.use('/kategori', router);
  };