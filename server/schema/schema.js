const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

const movies = [
    {id: '1', name: 'Film 1', genre: 'Criminal', directorId: '1'},
    {id: '2', name: 'Film 2 ', genre: 'Comedy', directorId: '2'},
    {id: 3, name: 'Film 3', genre: 'Drama', directorId: '3'},
    {id: 4, name: 'Film 4', genre: 'Fiz', directorId: '4'},
]

const directors = [
    {id: '1', name: 'name 1', age: 55},
    {id: '2', name: 'name 2', age: 33},
    {id: '3', name: 'name 3', age: 22},
    {id: '4', name: 'name 4', age: 66},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        directors: {
            type: DirectorType,
            resolve(parent,args){
                return directors.find(director => director.id == parent.id)

            }
        },

    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
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
        },
        directors: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id == args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})