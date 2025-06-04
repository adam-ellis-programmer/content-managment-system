const mongoose = require('mongoose')
const { blogSeedData } = require('./blogSeedData')

// Sample blog data with the specified userID

// Function to seed the blog data
async function seedBlogs(BlogModel) {
  try {
    // Clear existing blog data (optional - remove if you want to keep existing data)
    await BlogModel.deleteMany({})
    console.log('Existing blog data cleared')

    // Insert new blog data
    const insertedBlogs = await BlogModel.insertMany(blogSeedData)
    console.log(`Successfully seeded ${insertedBlogs.length} blog posts`)

    return insertedBlogs
  } catch (error) {
    console.error('Error seeding blog data:', error)
    throw error
  }
}

// Export for use in your application
module.exports = {
  blogSeedData,
  seedBlogs,
}
