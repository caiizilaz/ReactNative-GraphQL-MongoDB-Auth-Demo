export default {
  PORT: process.env.PORT || 3000,
  DB_URL: 'mongodb://127.0.0.1:27017/login-demo',
  GRAPHQL_PATH: '/graphql',
  JWT_SECRET: 'thisisasecret',
}