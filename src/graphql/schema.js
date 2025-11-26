import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type User {
    id:ID!,
    name:String!,
    email:String!,
    role:String! 
    }

    type Query {
    _dummy:String
    }


    type CreateBookResponse {
    success:Boolean!,
    message:String!
    }

    type DeleteBookResponse {
    success:Boolean!,
    message:String!
    }

    type Mutation {
    registerUser(name:String!,email:String!,password:String!,role:String!):User
    createBook(title:String!,author:String!,isbn:String!,publicationDate:String!,genre:String!,copies:Int!,description:String,publisher:String): CreateBookResponse
    deleteBook(bookId: ID!): DeleteBookResponse
    }
    `);
