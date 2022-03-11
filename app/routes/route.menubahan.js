module.exports = app => {
    const menubahan = require("../controllers/controller.menubahan.js");
    var router = require("express").Router();
    router.post("/", menubahan.create);
    router.delete("/:id", menubahan.delete);
    router.put("/:id", menubahan.update);
    router.get("/:id", menubahan.findOne);
    router.get("/", menubahan.findAll);
    app.use('/menubahan', router);
  };