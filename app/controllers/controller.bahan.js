const Bahan = require("../models/model.bahan.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status : false,
      message: "Request body tidak boleh kosong!"
    });
  }

  const bahan = new Bahan({
    nama_bahan: req.body.nama_bahan,
    satuan: req.body.satuan
  });

  Bahan.create( bahan, (err, data) => {
    if (err) {
      res.status(500).send({
        status : false,
        message: err.message || "Ada error ketika membuat data bahan."
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

  Bahan.findAll(keyword, (err, data) => {
    if (err)
      res.status(500).send({
        status : false,
        message : err.message || "Ada error ketika mengambil data bahan."
      });
    else res.send({
      status : true,
      message : "Success",
      data : data
    });
  });
};

exports.findOne = (req, res) => {
  Bahan.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data Bahan tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Error ketika mengambil data Bahan dengan id " + req.params.id
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

  Bahan.updateById(req.params.id, new Bahan(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status : false,
            message: `Data Bahan tidak ditemukan dengan id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            status : false,
            message: "Error ketika update data Bahan dengan id " + req.params.id
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
  Bahan.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status : false,
          message: `Data Bahan tidak ditemukan dengan id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          status : false,
          message: "Tidak dapat menghapus data Bahan dengan id " + req.params.id
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