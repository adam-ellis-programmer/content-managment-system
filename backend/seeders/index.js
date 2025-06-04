// Load environment variables first
require('dotenv').config()

const mongoose = require('mongoose')
const { seedBlogs } = require('./blogSeeder')

// Import your models
const Blog = require('../models/blogModel')

// Database connection
const connectDB = async () => {
  try {
    console.log(
      'Connecting to:',
      process.env.MONGO_URI ? 'Database URI found' : 'No MONGO_URI found'
    )
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// De-seeder function to remove seeded data
const runDeSeeder = async () => {
  try {
    console.log('🗑️  Starting database de-seeding...')

    // Connect to database
    await connectDB()

    // Remove seeded blog data
    console.log('🧹 Removing seeded blogs...')
    const deletedBlogs = await Blog.deleteMany({
      userID: new mongoose.Types.ObjectId('683c59dd901877b95558b7b8'), // Only delete demo user blogs
    })

    console.log(
      `🗑️  Successfully removed ${deletedBlogs.deletedCount} blog posts`
    )
    console.log('✅ De-seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ De-seeding failed:', error)
    process.exit(1)
  }
}

// Main seeder function
const runSeeders = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Connect to database
    await connectDB()

    // Run blog seeder
    console.log('📝 Seeding blogs...')
    await seedBlogs(Blog)

    console.log('✅ All seeders completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

// Check command line arguments
const args = process.argv.slice(2)
const command = args[0]

// Run seeders or de-seeders based on command
if (require.main === module) {
  if (command === 'clear') {
    runDeSeeder()
  } else {
    runSeeders()
  }
}

module.exports = { runSeeders, runDeSeeder }
