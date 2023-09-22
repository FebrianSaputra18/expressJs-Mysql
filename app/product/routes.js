const router = require("express").Router();
const multer = require("multer");
const upload = multer({dest: 'public/'})

const productController = require('./controller')



router.get("/product", productController.index);
router.get('/product/:id', productController.view)
router.post('/product/', upload.single('imageUrl'), productController.store)
router.put('/product/:id', upload.single('imageUrl'), productController.update)
router.delete('/product/:id', productController.destroy)

module.exports = router;
