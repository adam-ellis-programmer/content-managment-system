// Updated Site Controller with Cloudinary Integration
const asyncHandler = require('express-async-handler')
const siteImageModel = require('../models/SiteImageModel')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const mongoose = require('mongoose') // Add this import

// Generic controller to handle all page image updates
const updatePageImage = asyncHandler(async (req, res) => {
  try {
    const { imgPlace } = req.body

    // Add detailed logging
    console.log('=== UPLOAD REQUEST DEBUG ===')
    console.log('imgPlace:', imgPlace)
    console.log('req.file:', req.file)
    console.log('req.body:', req.body)
    console.log('===========================')

    if (!req.file) {
      console.log('ERROR: No file uploaded')
      return res.status(400).json({
        success: false,
        msg: 'No file uploaded',
      })
    }

    console.log('Uploading to Cloudinary...')
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'site-images',
      public_id: `${imgPlace}-${Date.now()}`,
      resource_type: 'image',
    })
    console.log('Cloudinary upload successful:', result.secure_url)

    // Delete local file after upload to Cloudinary
    fs.unlinkSync(req.file.path)
    console.log('Local file deleted')

    // Check if image already exists for this page
    console.log('Checking for existing image...')
    let existingImage = await siteImageModel.findOne({ imgPlace })
    console.log('Existing image found:', existingImage ? 'Yes' : 'No')

    if (existingImage) {
      // Delete old image from Cloudinary if it exists
      if (existingImage.img) {
        try {
          const publicId = existingImage.img.split('/').pop().split('.')[0]
          await cloudinary.uploader.destroy(`site-images/${publicId}`)
          console.log('Old Cloudinary image deleted')
        } catch (deleteError) {
          console.warn('Failed to delete old Cloudinary image:', deleteError)
        }
      }

      // Update existing record
      existingImage.img = result.secure_url
      await existingImage.save()
      console.log('Existing image updated')

      res.status(200).json({
        success: true,
        msg: `${imgPlace} image updated successfully`,
        imageUrl: result.secure_url,
        imageId: existingImage._id,
      })
    } else {
      console.log('Creating new image record...')
      // Create new record - REMOVE the imageId field since it's not in your schema
      const newImage = await siteImageModel.create({
        imgPlace,
        img: result.secure_url,
        // Remove this line: imageId: new mongoose.Types.ObjectId(),
      })
      console.log('New image created:', newImage._id)

      res.status(201).json({
        success: true,
        msg: `${imgPlace} image created successfully`,
        imageUrl: result.secure_url,
        imageId: newImage._id,
      })
    }
  } catch (error) {
    console.error('=== DETAILED ERROR ===')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('======================')

    // Clean up local file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path)
        console.log('Cleaned up local file after error')
      } catch (cleanupError) {
        console.error('Failed to cleanup local file:', cleanupError)
      }
    }

    res.status(500).json({
      success: false,
      msg: 'Error updating image',
      error: error.message,
      // Add more details for debugging
      errorDetails: {
        name: error.name,
        message: error.message,
      },
    })
  }
})

// Get image for a specific page
const getPageImage = asyncHandler(async (req, res) => {
  try {
    const { imgPlace } = req.params

    const image = await siteImageModel.findOne({ imgPlace })

    if (!image) {
      return res.status(404).json({
        success: false,
        msg: `No image found for ${imgPlace}`,
      })
    }

    res.status(200).json({
      success: true,
      image: {
        id: image._id,
        imgPlace: image.imgPlace,
        imageUrl: image.img,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
      },
    })
  } catch (error) {
    console.error('Error getting page image:', error)
    res.status(500).json({
      success: false,
      msg: 'Error retrieving image',
      error: error.message,
    })
  }
})

// Get all site images
const getAllSiteImages = asyncHandler(async (req, res) => {
  try {
    const images = await siteImageModel.find({})

    res.status(200).json({
      success: true,
      images: images.map((img) => ({
        id: img._id,
        imgPlace: img.imgPlace,
        imageUrl: img.img,
        createdAt: img.createdAt,
        updatedAt: img.updatedAt,
      })),
    })
  } catch (error) {
    console.error('Error getting all site images:', error)
    res.status(500).json({
      success: false,
      msg: 'Error retrieving images',
      error: error.message,
    })
  }
})

module.exports = {
  updatePageImage,
  getPageImage,
  getAllSiteImages,
}
