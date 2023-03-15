import client from "../../src/client"
export default {
    Query: {
        seeCoffeeShop: (_, { id }) => {
            return client.coffeeShop.findUnique({
                where: { id }
            })
        }
    }
}