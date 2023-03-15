export default `#graphql 
    type editCoffeeShopResult {
        ok          :   Boolean!
        error       :   String
        coffeeShop  : CoffeeShop
    }
    type Mutation {
        editCoffeeShop( 
            id          :   Int!
            name        :   String
            longitude   :   String
            latitude    :   String
            categories  :   [String]
        ): editCoffeeShopResult!
    }
`