module.exports = app => {
    const menu = require("../controllers/controller.menu.js");
    var router = require("express").Router();
    router.post("/", menu.create);
    router.delete("/:id", menu.delete);
    router.put("/:id", menu.update);
    router.get("/:id", menu.findOne);
    router.get("/", menu.findAll);
    app.use('/menu', router);
  };