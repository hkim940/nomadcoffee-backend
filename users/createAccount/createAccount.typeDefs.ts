export default `#graphql 
    type CreateAccountResult {
        ok:     Boolean!
        error:  String
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
        ): CreateAccountResult!
    }
`