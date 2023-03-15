export default `#graphql
    type Mutation {
        createCoffeeShop( 
            name:         String!
            latitude:     String!
            longitude:    String!
            categories:   [String]
        ):CoffeeShop
    }
`