const mongoose = require('mongoose')

const siteImageSchema = mongoose.Schema(
  {
    // Remove imageId field since MongoDB provides _id automatically
    imgPlace: {
      type: String,
      required: true,
      unique: true, // Ensure only one image per page
      enum: ['homePage', 'registerPage', 'loginPage'], // Restrict to valid pages
    },
    img: {
      type: String,
      required: true,
    },
    // Optional: store original filename and size
    originalName: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('siteImages', siteImageSchema)
