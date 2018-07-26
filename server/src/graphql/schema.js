export default `
  scalar Date

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    me: Me
  }

  type Mutation {
    signup(email: String!, fullName: String!, password: String!, avatar: String!, username: String!): Auth
    login(username: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`