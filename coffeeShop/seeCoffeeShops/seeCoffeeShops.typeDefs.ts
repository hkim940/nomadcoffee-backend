export default `#graphql
    type Query {
        seeCoffeeShops( page: Int! ): [CoffeeShop]
    }
`