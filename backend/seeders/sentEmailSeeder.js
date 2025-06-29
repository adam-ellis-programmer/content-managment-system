const mongoose = require('mongoose')
const { sentEmailData } = require('./sentEmailData')


async function seedSentEmails(sentEmailSignupModel) {
  try {
    await sentEmailSignupModel.deleteMany({})
    console.log('Existing email data cleared')

    const insertData = await sentEmailSignupModel.insertMany(sentEmailData)
    console.log('Email data seeded successfully')

    return insertData
  } catch (error) {
    console.error('There was an issue seeding the email database:', error)
    throw error
  }
}

module.exports = { seedSentEmails }
