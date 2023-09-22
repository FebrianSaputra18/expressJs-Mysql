const conn = require("../../config/mysql");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  const { search } = req.query;
  let dataS = {};
  if (search) {
    dataS = {
      sql: "SELECT * FROM products WHERE product_name LIKE ?",
      values: [`%${search}%`],
    };
  } else {
    dataS = {
      sql: "SELECT * FROM products",
    };
  }
  conn.query(dataS,_response(res));
};
const view = (req, res) => {
  conn.query(
    {
      sql: "SELECT * FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const destroy = (req, res) => {
  conn.query(
    {
      sql: "DELETE FROM products WHERE id = ?",
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { user_id, product_name, description, price, stock, status } = req.body;
  const image = req.file;

  if (image) {
    const target = path.join(__dirname, "../../public", image.originalname);
    fs.renameSync(image.path, target);
    conn.query(
      {
        sql: "INSERT INTO products (user_id, product_name, description, price, stock, status, imgUrl) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values: [
          parseInt(user_id),
          product_name,
          description,
          price,
          stock,
          status,
          `http://localhost:3000/public/${image.originalname}`,
        ],
      },
      _response(res)
    );
  }
};

const update = (req, res) => {
  const { user_id, product_name, description, price, stock, status } = req.body;
  const image = req.file;

  let sql = "";
  let values = [];

  if (image) {
    const target = path.join(__dirname, "../../public", image.originalname);
    fs.renameSync(image.path, target);
    sql =
      "UPDATE products SET user_id = ?, product_name = ?, description = ?, price = ?, stock = ?, status = ?, imgUrl = ? WHERE id = ?";
    values = [
      parseInt(user_id),
      product_name,
      description,
      price,
      stock,
      status,
      `http://localhost:3000/public/${image.originalname}`,
      req.params.id,
    ];
  } else {
    sql =
      "UPDATE products SET user_id = ?, product_name = ?, description = ?, price = ?, stock = ?, status = ? WHERE id = ?";
    values = [
      parseInt(user_id),
      product_name,
      description,
      price,
      stock,
      status,
      req.params.id,
    ];
  }
  conn.query({ sql, values }, _response(res));
};

const _response = (res) => {
  return (err, result) => {
    if (err) {
      res.send({
        status: "failed",
        response: err,
      });
    } else {
      res.send({
        status: "success",
        response: result,
      });
    }
  };
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
