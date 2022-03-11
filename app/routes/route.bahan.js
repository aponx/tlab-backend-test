module.exports = app => {
    const bahan = require("../controllers/controller.bahan.js");
    var router = require("express").Router();
    router.post("/", bahan.create);
    router.delete("/:id", bahan.delete);
    router.put("/:id", bahan.update);
    router.get("/:id", bahan.findOne);
    router.get("/", bahan.findAll);
    app.use('/bahan', router);
  };