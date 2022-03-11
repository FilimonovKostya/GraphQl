const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

const movies = [
    {id: '1', name: 'Film 1', genre: 'Criminal', directorId: '1'},
    {id: '2', name: 'Film 2 ', genre: 'Comedy', directorId: '1'},
    {id: 3, name: 'Film 3', genre: 'Drama', directorId: '1'},
    {id: 4, name: 'Film 4', genre: 'A', directorId: '4'},
    {id: 5, name: 'Film 4', genre: 'Ab', directorId: '4'},
    {id: 6, name: 'Film 6я', genre: 'Abc', directorId: '4'},
    {id: 7, name: 'Film 7', genre: 'Abcd', directorId: '4'},
    {id: 8, name: 'Film 8', genre: 'Zxc', directorId: '2'},
    {id: 9, name: 'Film 9', genre: 'Zxc', directorId: '3'},
]

const directors = [
    {id: '1', name: 'Tarantino', age: 55},
    {id: '2', name: 'name 2', age: 33},
    {id: '3', name: 'name 3', age: 22},
    {id: '4', name: 'Rich', age: 66},
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        directors: {
            type: DirectorType,
            resolve(parent, args) {
                return directors.find(director => director.id == parent.id)

            }
        },

    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parent, args) => {
                return movies.filter(movie => movie.directorId == parent.id)
            }
        }
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
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id == args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})