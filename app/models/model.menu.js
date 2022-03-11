const sql = require("./db.js");

const Menu = function(menu) {
  this.nama_menu   = menu.nama_menu;
  this.id_kategori    = menu.id_kategori;
  this.harga    = menu.harga;
};

Menu.create = (menu, result) => {
  sql.query("INSERT INTO menu SET ?", menu, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...menu });
  });
};

Menu.findById = (id, result) => {
  sql.query(`SELECT * FROM menu WHERE id = ${id}`, (err, res) => {
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

Menu.findAll = (keyword, result) => {
  let query = "SELECT * FROM menu";

  if (keyword) {
    query += ` WHERE nama_menu LIKE '%${keyword}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Menu.updateById = (id, menu, result) => {
  sql.query(
    "UPDATE menu SET nama_menu = ?, id_kategori = ?, harga = ? WHERE id = ?",
    [menu.nama_menu, menu.id_kategori, menu.harga, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...menu });
    }
  );
};

Menu.remove = (id, result) => {
  sql.query("DELETE FROM menu WHERE id = ?", id, (err, res) => {
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

module.exports = Menu;