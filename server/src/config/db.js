import mongoose from 'mongoose'

import constants from './constants'

mongoose.Promise = global.Promise

mongoose.set('debug', true)

try {
  mongoose.connect(constants.DB_URL)
} catch (err) {
  mongoose.createConnection(constants.DB_URL)
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e
  })