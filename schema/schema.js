const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movie');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;


const movies = [
    { name: 'Death Zone: Cleaning Mount Everest', year: 2018, id: '1', director_id: '1' },
    { name: 'Chhakka Panja 2', year: 2017, id: '2', director_id: '2' },
];

const director = [
    { name: 'Hari Bhakta', age: 45, id: '1' },
    { name: 'Ram Charan', age: 35, id: '2' }
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        year: { type: GraphQLInt },
        name: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return _.find(director, { id: parent.director_id })
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Directors',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return _.filter(movies, { director_id: parent.id })
            }
        }
    })
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovies: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                year: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let movie_details = new Movie(args);
                return movie_details.save();
            }
        }
    }
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(movies, { id: args.id });
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(director, { id: args.id })
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
                return director
            }
        }
    },

})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
