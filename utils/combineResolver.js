import _ from 'lodash'

export const combineResolver = (mainResolver, resolvers) => ({
  Query: _.reduce(resolvers, (queryMap, resolver, resolverName)=> {
    return _.set(resolverName, resolver.Query, queryMap)
  }, mainResolver),
  Mutation: _.reduce(resolvers, (mutationMap, resolver, resolverName)=> {
    return _.set(resolverName, resolver.Mutation, mutationMap)
  }, mainResolver),
})