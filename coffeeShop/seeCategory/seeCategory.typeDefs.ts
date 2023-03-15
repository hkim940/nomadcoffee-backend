export default `#graphql
    type SeeCategoryResult {
        ok      :  Boolean!
        error   :  String
        shops   :  [CoffeeShop]
    }

    type Query {
        seeCategory(
            id      : Int!, 
            page    : Int! 
        ): SeeCategoryResult!
    }
`