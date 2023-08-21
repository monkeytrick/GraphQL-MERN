// Import objects required from GraphQL
const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull,
    GraphQLEnumType
} = require('graphql');

// Import DB models/schema for Mongoose
const Project = require('../models/Project.js');
const Client = require('../models/Client.js');

// GrapQL Schema outlines - objects that define the fields and types of data
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
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
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
                return Client.find();
            }
        },          
        client: {
            type: ClientType,
            // 'args' are the params passed in the query from the front end
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return Client.findById(args.id);
            }
        },
        projects: {
            type: GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            }
        },          
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                return Project.findById(args.id); 
            }
        }
    }
})

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add new client
        addClient: {
            // Specify object schema (from above)
            type: ClientType,
            // 'args' are the params passed as query from the front end. NonNull ensures these are not empty
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return client.save()
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            reslove(parent, args) {
                //Delete projects associated with client
                Project.find( {clientId: args.id }).then(
                    (projects) => {
                    projects.forEach(project => {
                        project.remove()
                    })
                })
                return Client.findByIdAndRemove(args.id);
            }
        },

    //Add a project 
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString)},
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                defaultValue: 'Not Started',
                },
            clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.descritopn,
                    status: args.status,
                    clientId: args.clientId
                });
    
            return project.save();
            }
        },

        // Delete project

        deleteProject: {
            type: ProjectType,
            args: {
                    id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve (parent, args) {
                return Project.findByIdAndRemove(args.id)
            }
        },

        // Update project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString},
                description: { type: GraphQLString},
                status: { 
                    type: new GraphQLEnumType({
                        // Below 'name' must be unique. Cannot use again as used in above 
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: {value: 'Not Started'},
                            progress: {value: 'In Progress'},
                            completed: {value: 'Completed'},
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(args.id, {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                { new: true}
                )

            }
        }
    
        }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})

