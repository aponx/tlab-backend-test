const sql = require("./db.js");
const Menu = require("./model.menu.js");

const MenuBahan = function(menubahan) {
  this.id_bahan   = menubahan.id_bahan;
  this.id_menu    = menubahan.id_menu;
  this.id_kategori    = menubahan.id_kategori;
  this.qty     = menubahan.qty;
};

MenuBahan.create = (menubahan, result) => {
  sql.query("INSERT INTO menu_bahan SET ?", menubahan, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...menubahan });
  });
};

MenuBahan.findById = (id, result) => {
  sql.query(`SELECT * FROM menu_bahan WHERE id = ${id}`, (err, res) => {
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

MenuBahan.findAll = (result) => {
  let query = "SELECT * FROM menu_bahan";

  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

MenuBahan.updateById = (id, menubahan, result) => {
  sql.query(
    "UPDATE menu_bahan SET id_bahan = ?, id_menu = ?, id_kategori = ?, qty = ? WHERE id = ?",
    [menubahan.id_bahan, menubahan.id_menu, menubahan.id_kategori, menubahan.qty, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...menubahan });
    }
  );
};

MenuBahan.remove = (id, result) => {
  sql.query("DELETE FROM menu_bahan WHERE id = ?", id, (err, res) => {
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

module.exports = MenuBahan;