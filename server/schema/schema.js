import  graphql, { GraphQLList }  from 'graphql'; 
import Pups from "../models/PupModel.js";
import Users from "../models/UserModel.js";
const { GraphQLObjectType, GraphQLString, 
  GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

// var fakeBookDatabase = [
//   { name:"Book 1", pages:432 , id:1},
//   { name: "Book 2", pages: 32, id: 2},
//   { name: "Book 3", pages: 532, id: 3 }
// ]

const PupType = new GraphQLObjectType({
  name: 'Pups',
  fields: () => ({
      id: { type: GraphQLID  },
      name: { type: GraphQLString }, 
      photoURL: { type: GraphQLString },
      breed: { type: GraphQLString },
      bio: { type: GraphQLString },
      energy: { type: GraphQLInt },
      owner: { type: UserType, 
              resolve(parent,args){
                return Users.findById(parent.owner_id)
              }},
      gender: { type: GraphQLString },
      bones: { type: GraphQLInt },
  })
});

const UserType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
      id: { type: GraphQLID  },
      name: { type: GraphQLString }, 
      photoURL: { type: GraphQLString },
      bio: { type: GraphQLString }  
    })   
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular book 
//or get a particular author.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      pup: {
          type: PupType,
          //argument passed by the user while making the query
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              //Here we define how to get data from database source

              //this will return the book with id passed in argument by the user
              return  Pups.findById(args.id)
          }
      },
      pups: {
        type:new GraphQLList( PupType ),
        resolve(parent,args) {
          return Pups.find({})
        }
      },
      users: {
        type:new GraphQLList( UserType ),
        resolve(parent,args) {
          return Users.find({})
        }
      }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPup: {
      type: PupType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        photoURL: { type: GraphQLString },
        breed: { type: GraphQLString },
        bio: { type: GraphQLString },
        energy: { type: GraphQLInt },
        owner_id: { type: GraphQLString },
        gender: { type: GraphQLString },
        bones: { type: GraphQLInt },
      },
      resolve(parent,args){
       return Pups.create({ name: args.name})
      }
    },
  },
});
//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation 
});

export default schema;
