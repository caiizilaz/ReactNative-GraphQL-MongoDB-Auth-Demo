import { store as authStore } from './AuthStore'
import { withClientState } from 'apollo-link-state'

import flow from 'lodash/fp/flow'
import assignIn from 'lodash/fp/assignIn'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
const reduceWithDefault = reduce.convert({ cap: false })

/**
 * At a given attribute this will merge all objects
 * in a list of objects found at that attribute.
 *
 * @example
 * const listOfObjects = [
 *   {defaults: {a: 1}},
 *   {defaults: {b: {}}},
 *   {defaults: {c: "string"}}
 * ]
 *
 * // returns {a: 1, b: {}, c: "string"}
 * mergeGet("defaults")(listOfObjects)
 *
 * @param {String} attributeName - The Apollo cache
 * @returns {Function} Apollo State Link
 */
const mergeGet = (attributeName) => flow(
  // pick a single attribute from each object
  map(attributeName),
  // merge all values into a single object
  reduceWithDefault(assignIn, {})
)

const STORES = [
  authStore,
]

/**
 * Map the Mutation handlers and Default Values of our local state to
 * the Apollo cache.
 *
 * To see how this works: https://github.com/apollographql/apollo-link-state
 *
 * @param {Object} cache - The Apollo cache
 * @returns {*} Apollo State Link
 */
const CreateClientStore = (cache) => {
  const defaults = mergeGet('defaults')(STORES)
  const mutations = mergeGet('mutations')(STORES)
  return withClientState({
    cache,
    defaults: defaults,
    resolvers: {
      Mutation: mutations,
    },
  })
}

export default CreateClientStore
