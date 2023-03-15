import client from "../../src/client"

export default {
    Query: {
        seeCoffeeShops: (_, { page }) => {
            return client.coffeeShop.findMany({
                take: 2,
                skip: (page - 1) * 2,
            })
        }
    }
}