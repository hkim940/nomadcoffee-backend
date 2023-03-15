export default `#graphql
    type CoffeeShopPhoto {
        id:     Int!
        url:    String!
        shop:   CoffeeShop
    }
    type CoffeeShop {
        id:         Int!
        name:       String!
        latitude:   String!
        longitude:  String!
        user:       User!
        photos:     [CoffeeShopPhoto]
        categories: [Category]
    }
    type Category {
        id:         Int!
        category:   String!
        slug:       String
        shops:      [CoffeeShop]
        totalShops: Int!
    }
`
