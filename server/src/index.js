import express from 'express'
import graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'

import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import './config/db'
import constants from './config/constants'
import middlewares from './config/middlewares'
import mocks from './mocks'

const app = express()
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

middlewares(app)

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  context: {
    user: req.user,
  },
})))

const server = createServer(app)

mocks().then(() => {
  server.listen(constants.PORT, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`App listen on port: ${constants.PORT}`)
    }
  })
})