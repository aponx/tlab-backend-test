const Menu = require("../models/model.menu.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request body tidak boleh kosong!"
    });
  }

  const menu = new Menu({
    nama_menu: req.body.nama_menu,
    harga: req.body.harga,
    id_kategori: req.body.id_kategori
  });

  Menu.create( menu, (err, data) => {
    if (err) {
      res.status(500).send({
        status : false,
        message: err.message || "Ada error ketika membuat data menu."
      });
    } else {
        res.send({
          status : true,
          message : "Success",
          data : data
        });
    }
  });
};

exports.findAll = (req, res) => {
  const keyword = req.query.keyword;

  Menu.findAll(keyword, (err, data) => {
    if (err)
      res.status(500).send({
        status : false,
        message : err.message || "Ada error ketika mengambil data menu."
      });
    else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.findOne = (req, res) => {
  Menu.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data menu tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Error ketika mengambil data menu dengan id " + req.params.id
        });
      }
    } else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request Body tidak boleh kosong!"
    });
  }

  Menu.updateById(req.params.id, new Menu(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status : false,
            message: `Data menu tidak ditemukan dengan id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            status : false,
            message: "Error ketika update data menu dengan id " + req.params.id
          });
        }
      } else {
        res.send({
          status : true,
          message : "Success",
          data : data
        });
      }
    }
  );
};

exports.delete = (req, res) => {
  Menu.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data menu tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Tidak dapat menghapus data menu dengan id " + req.params.id
        });
      }
    } else {
      res.send({
        status : true,
        message: "Success"
      });
    }
  });
};