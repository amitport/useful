const mongoose = require('mongoose')
mongoose.Promise = Promise

const Mockgoose = require('mockgoose').Mockgoose
const mockgoose = new Mockgoose(mongoose)
const debug = require('debug')('useful')

module.exports = async () => {
  debug('connecting to db...')
  await mockgoose.prepareStorage()
  await mongoose.connect('mongodb://fake-domain.com/TestingDB')

  debug('connected to test db')
}
