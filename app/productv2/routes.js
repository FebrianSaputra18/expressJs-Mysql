const router = require('express').Router()
const multer = require('multer');
const productController = require('./controller')
const upload = multer({dest: 'public/sequelize'})

router.get('/product', productController.index)
router.get('/product/:id', productController.view)
router.post('/product', upload.single('imageUrl'), productController.store)
router.delete('/product/:id', productController.destroy)

module.exports = router;