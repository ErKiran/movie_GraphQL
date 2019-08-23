const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const _ = require('lodash');

var movies = [
    {
        id: 1,
        title: "Death Zone: Cleaning Mount Everest",
        year: 2018,
        votes: 65,
    },
    {
        title: "Chhakka Panja 2",
        id: 2,
        year: 2017,
        votes: 261,
    },
];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        year: { type: GraphQLInt },
        votes: { type: GraphQLInt },
        title: { type: GraphQLString },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(movies, { id: args.id });
            }
        }
    },

})

module.exports = new GraphQLSchema({
    query: RootQuery
})