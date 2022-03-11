const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema , GraphQLID} = graphql

const movies = [
    {id: '1', name: 'Film 1', genre: 'Criminal'},
    {id: '2', name: 'Film 2 ', genre: 'Comedy'},
    {id: 3, name: 'Film 3', genre: 'Drama'},
    {id: 4, name: 'Film 4', genre: 'Fiz'},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})