const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
    }
    type Book {
        authors: [String]
        title: String
        description: String
        bookId: String
        image: String
        link: String
    }
    type Auth {
        token: ID
        user: User
    }
    input BookInput {
        authors: [String]
        title: String
        description: String
        bookId: String
        image: String
        link: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, passwork: String!): Auth
        saveBook(input: bookInput): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;