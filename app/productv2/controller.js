const Product = require("./model");
const path = require("path");
const fs = require("fs");

const index = async (req, res) => {
  try {
    const data = await Product.findAll();

    res.status(200).json(data);
  } catch (e) {
    console.error(e, "Gagal bang");
  }
};

const view = async (req, res) => {
  try {
    const data = await Product.findByPk();

    res.status(200).json(data);
  } catch (error) {}
};

const store = async (req, res) => {
  const { user_id, name, price, stock, status, imageUrl } = req.body;

  const image = req.file;
  if (image) {
    const target = path.join(
      __dirname,
      "../../public/sequelize",
      image.originalname
    );
    fs.renameSync(image.path, target);

    try {
      await Product.sync();
      const result = await Product.create({
        user_id,
        name,
        price,
        stock,
        status,
        imageUrl: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const update = async (req, res) => {
  const { user_id, name, price, stock, status, imageUrl } = req.body;

  const image = req.file;
  if (image) {
    const target = path.join(
      __dirname,
      "../../public/sequelize",
      image.originalname
    );
    fs.renameSync(image.path, target);

    try {
      await Product.sync();
      const result = await Product.create({
        user_id,
        name,
        price,
        stock,
        status,
        imageUrl: `http://localhost:3000/public/${image.originalname}`,
      });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }else{
    try {
        await Product.sync();
        const result = await Product.create({
          user_id,
          name,
          price,
          stock,
          status,
        });
        res.send(result);
      } catch (e) {
        res.send(e);
      }
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteData = await Product.findByPk(id);

    if (!deleteData) {
      return res.status(404).json({ error: "Product not found" });
    }

    await deleteData.destroy();
    res.status(200).json("Udah di hapus mang");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error bang" });
  }
};

module.exports = {
  index,
  view,
  store,
  destroy,
};
