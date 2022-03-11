const sql = require("./db.js");

const Kategori = function(kategori) {
  this.nama_kategori   = kategori.nama_kategori;
};

Kategori.create = (kategori, result) => {
  sql.query("INSERT INTO kategori SET ?", kategori, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...kategori });
  });
};

Kategori.findById = (id, result) => {
  sql.query(`SELECT * FROM kategori WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Kategori.findAll = (keyword, result) => {
  let query = "SELECT * FROM kategori";

  if (keyword) {
    query += ` WHERE nama_kategori LIKE '%${keyword}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Kategori.updateById = (id, kategori, result) => {
  sql.query(
    "UPDATE kategori SET nama_kategori = ? WHERE id = ?",
    [kategori.nama_kategori, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...kategori });
    }
  );
};

Kategori.remove = (id, result) => {
  sql.query("DELETE FROM kategori WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Kategori;