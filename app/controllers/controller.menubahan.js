const MenuBahan = require("../models/model.menubahan.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request body tidak boleh kosong!"
    });
  }

  const menubahan = new MenuBahan({
    id_bahan: req.body.id_bahan,
    id_menu: req.body.id_menu,
    id_kategori: req.body.id_kategori,
    qty: req.body.qty
  });

  MenuBahan.create( menubahan, (err, data) => {
    if (err) {
      res.status(500).send({
        status : false,
        message: err.message || "Ada error ketika membuat data MenuBahan."
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

  MenuBahan.findAll((err, data) => {
    if (err)
      res.status(500).send({
        status : false,
        message : err.message || "Ada error ketika mengambil data MenuBahan."
      });
    else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.findOne = (req, res) => {
  MenuBahan.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data MenuBahan tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Error ketika mengambil data MenuBahan dengan id " + req.params.id
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

  MenuBahan.updateById(req.params.id, new MenuBahan(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status : false,
            message: `Data MenuBahan tidak ditemukan dengan id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            status : false,
            message: "Error ketika update data MenuBahan dengan id " + req.params.id
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
  MenuBahan.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data MenuBahan tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Tidak dapat menghapus data MenuBahan dengan id " + req.params.id
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