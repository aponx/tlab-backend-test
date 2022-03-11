const sql = require("./db.js");

const Bahan = function(bahan) {
  this.nama_bahan    = bahan.nama_bahan;
  this.satuan    = bahan.satuan;
};

Bahan.create = (bahan, result) => {
  sql.query("INSERT INTO bahan SET ?", bahan, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...bahan });
  });
};

Bahan.findById = (id, result) => {
  sql.query(`SELECT * FROM bahan WHERE id = ${id}`, (err, res) => {
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

Bahan.findAll = (keyword, result) => {
  let query = "SELECT * FROM bahan";

  if (keyword) {
    query += ` WHERE nama_bahan LIKE '%${keyword}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Bahan.updateById = (id, bahan, result) => {
  sql.query(
    "UPDATE bahan SET nama_bahan = ?, satuan = ? WHERE id = ?",
    [bahan.nama_bahan, bahan.satuan, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...bahan });
    }
  );
};

Bahan.remove = (id, result) => {
  sql.query("DELETE FROM bahan WHERE id = ?", id, (err, res) => {
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

module.exports = Bahan;