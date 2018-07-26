import GraphQLDate from 'graphql-date'

import UserResolvers from './user-resolvers'

export default {
  Date: GraphQLDate,
  Query: {
    me: UserResolvers.me,
  },
  Mutation: {
    signup: UserResolvers.signup,
    login: UserResolvers.login,
  },
}