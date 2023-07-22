const { projects, clients } = require('../schema/sampleData.js');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');

// Schema outline
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString}
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            }
        }
    })
})

//Root query - entry point for queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: GraphQLList(ClientType),
            resolve(parent, args) {
                return clients
            }
        },          
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return clients.find(client => client.id === args.id)
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects
            }
        },          
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return projects.find(project => project.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

