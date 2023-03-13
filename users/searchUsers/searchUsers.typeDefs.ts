export default `#graphql
    type Query {
        searchUsers(    
            keyword : String!
            page    : Int!
        ): [User]
    }
`