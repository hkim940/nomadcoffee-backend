export default `#graphql
    type User {
        id:                 String!
        firstName:          String!
        lastName:           String
        username:           String!
        email:              String!
        location:           String!
        avatarURL:          String!
        githubUsername:     String!
        createdAt:          String!
        updatedAt:          String!
    }

    type Mutation {
        createAccount(
            firstName:      String!
            lastName:       String
            username:       String!
            email:          String!
            password:       String!
            location:       String!
            avatarURL:      String!
            githubUsername: String!
        ): User
    }

    type Query {
        seeProfile( username: String! ): User
    }
`
