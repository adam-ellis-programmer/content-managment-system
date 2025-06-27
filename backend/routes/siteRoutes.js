const express = require('express')
const {
  updatePageImage,
  getPageImage,
  getAllSiteImages,
} = require('../controllers/siteController')

const { upload } = require('../middleware/multerMiddleware')
const router = express.Router()

// Upload/Update page image
router.post('/upload-image', upload.single('image'), updatePageImage)

// Get specific page image
router.get('/image/:imgPlace', getPageImage)

// Get all site images
router.get('/images', getAllSiteImages)

module.exports = router
