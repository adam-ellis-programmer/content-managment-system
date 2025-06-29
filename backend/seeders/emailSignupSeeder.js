const mongoose = require('mongoose')
const { emailSignupData } = require('./emailSeedData')

async function seedEmailSignupData(emailSignupModel) {
  try {
    await emailSignupModel.deleteMany({})
    console.log('Existing email data cleared')

    const insertData = await emailSignupModel.insertMany(emailSignupData)
    console.log('Email signup data seeded successfully')

    return insertData
  } catch (error) {
    console.error('There was an issue seeding the email database:', error)
    throw error
  }
}

module.exports = { seedEmailSignupData }
