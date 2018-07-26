import faker from 'faker'

import User from '../models/User'

const USERS_TOTAL = 3

export default async () => {
  try {
    await User.remove()
    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        username: `caiizilaz${i}`,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: '123456',
      })
    })
  } catch (error) {
    throw error
  }
}