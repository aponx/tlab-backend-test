const Kategori = require("../models/model.kategori.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request body tidak boleh kosong!"
    });
  }

  const kategori = new Kategori({
    nama_kategori: req.body.nama_kategori
  });

  Kategori.create( kategori, (err, data) => {
    if (err) {
      res.status(500).send({
        status : false,
        message: err.message || "Ada error ketika membuat data Kategori."
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

  Kategori.findAll(keyword, (err, data) => {
    if (err)
      res.status(500).send({
        status : false,
        message : err.message || "Ada error ketika mengambil data Kategori."
      });
    else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.findOne = (req, res) => {
  Kategori.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data Kategori tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Error ketika mengambil data Kategori dengan id " + req.params.id
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

  Kategori.updateById(req.params.id, new Kategori(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status : false,
            message: `Data Kategori tidak ditemukan dengan id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            status : false,
            message: "Error ketika update data Kategori dengan id " + req.params.id
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
  Kategori.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data Kategori tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Tidak dapat menghapus data Kategori dengan id " + req.params.id
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